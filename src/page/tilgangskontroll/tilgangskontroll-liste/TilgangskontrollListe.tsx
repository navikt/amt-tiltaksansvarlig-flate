import React, { useState } from 'react'
import { AxiosResponse } from 'axios'
import { Alert, BodyShort, Panel } from '@navikt/ds-react'
import { TilgangInvitasjonListeContent } from './tilgang-invitasjon-liste-content/TilgangInvitasjonListeContent'
import { TilgangListeContent } from './tilgang-liste-content/TilgangListeContent'
import styles from './TilgangskontrollListe.module.scss'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import {
	Tilganger, UbesluttedeTilgangForesporsler,
	UbrukteTilgangInvitasjoner, avvisForesporsel,
	fetchAnsattTilganger, fetchUbesluttedeTilgangForesporsler,
	fetchUbrukteTilgangInvitasjoner, godkjennForesporsel, stopAnsattTilgang, avbrytInvitasjon
} from '../../../api/api'
import { Spinner } from '../../../component/spinner/Spinner'
import { TilgangForesporselListeContent } from './tilgang-foresporsel-liste-content/TilgangForesporselListeContent'

interface TilgangskontrollListeProps {
	gjennomforingId: string
}

export const TilgangskontrollListe = (props: TilgangskontrollListeProps): React.ReactElement => {
	const { gjennomforingId } = props

	const [ failedToFetch, setFailedToFetch ] = useState<boolean>(false)

	const tilgangerPromise = usePromise<AxiosResponse<Tilganger>>(() => fetchAnsattTilganger(gjennomforingId))
	const tilgangInvitasjonerPromise = usePromise<AxiosResponse<UbrukteTilgangInvitasjoner>>(() => fetchUbrukteTilgangInvitasjoner(gjennomforingId))
	const tilgangForesporslerPromise = usePromise<AxiosResponse<UbesluttedeTilgangForesporsler>>(() => fetchUbesluttedeTilgangForesporsler(gjennomforingId))

	if (
		isNotStartedOrPending(tilgangerPromise)
		|| isNotStartedOrPending(tilgangInvitasjonerPromise)
		|| isNotStartedOrPending(tilgangForesporslerPromise)
	)
		return <Spinner/>

	if (
		isRejected(tilgangerPromise)
		|| isRejected(tilgangInvitasjonerPromise)
		|| isRejected(tilgangForesporslerPromise)
		|| failedToFetch
	)
		return <Alert variant="error">Klarte ikke å hente data</Alert>

	const slettTilgang = (tilgangId: string) => {
		stopAnsattTilgang(tilgangId)
			.then(() => tilgangerPromise.setPromise(fetchAnsattTilganger(gjennomforingId)))
			.catch(() => setFailedToFetch(true))
	}

	const onGodkjennForesporsel = (foresporselId: string) => {
		godkjennForesporsel(foresporselId)
			.then(() => {
				tilgangForesporslerPromise.setPromise(fetchUbesluttedeTilgangForesporsler(gjennomforingId))
				tilgangerPromise.setPromise(fetchAnsattTilganger(gjennomforingId))
			})
			.catch(() => setFailedToFetch(true))
	}

	const onAvvisForesporsel = (foresporselId: string) => {
		avvisForesporsel(foresporselId)
			.then(() => tilgangForesporslerPromise.setPromise(fetchUbesluttedeTilgangForesporsler(gjennomforingId)))
			.catch(() => setFailedToFetch(true))
	}

	const onAvbrytInvitasjon = (invitasjonId: string) => {
		avbrytInvitasjon(invitasjonId)
			.then(() => tilgangInvitasjonerPromise.setPromise(fetchUbrukteTilgangInvitasjoner(gjennomforingId)))
			.catch(() => setFailedToFetch(true))
	}

	const tilganger = tilgangerPromise.result?.data ?? []
	const invitasjoner = tilgangInvitasjonerPromise.result?.data ?? []
	const foresporsler = tilgangForesporslerPromise.result?.data ?? []

	const tilgangerContent = tilganger.map(t => (
		<TilgangListeContent
			ansattTilgang={t}
			onSlettTilgang={slettTilgang}
			key={t.id}/>
	))

	const invitasjonerContent = invitasjoner.map(i => (
		<TilgangInvitasjonListeContent
			invitasjon={i}
			onAvbrytInvitasjon={onAvbrytInvitasjon}
			key={i.id}
		/>
	))

	const foresporslerContent = foresporsler.map(f => (
		<TilgangForesporselListeContent
			foresporsel={f}
			onGodkjennForesporsel={onGodkjennForesporsel}
			onAvvisForesporsel={onAvvisForesporsel}
			key={f.id}
		/>
	))

	if (tilgangerContent.length + invitasjonerContent.length + foresporslerContent.length === 0) {
		return <BodyShort>Ingen koordinatorer registrert</BodyShort>
	}

	const listeContent = [ ...foresporslerContent, ...invitasjonerContent, ...tilgangerContent ]

	return (
		<ul className={styles.liste}>
			{listeContent.map((c, idx) => {
				return (
					<li className={styles.listItem} key={idx}>
						<Panel className={styles.panel}>{c}</Panel>
					</li>
				)
			})}
		</ul>
	)
}