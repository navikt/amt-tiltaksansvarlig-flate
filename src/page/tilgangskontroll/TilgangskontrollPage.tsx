import React, { useState } from 'react'

import styles from './TilgangskontrollPage.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { gjennomforingDetaljerPageUrl } from '../../navigation'
import { useParams } from 'react-router-dom'
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import { Add } from '@navikt/ds-icons'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { AxiosResponse } from 'axios'
import {
	AnsattTilganger,
	AnsattTilgangInvitasjoner,
	avbrytInvitasjon,
	fetchAnsattTilganger,
	fetchGjennomforing,
	fetchTilgangInvitasjoner,
	Gjennomforing,
	godkjennInvitasjon,
	opprettInvitasjon,
	stopAnsattTilgang
} from '../../api/api'
import globalStyles from '../../globals.module.scss'
import { AnsattTilgangListeElement } from './ansatt-tilgang-liste-element/AnsattTilgangListeElement'
import { AnsattInvitasjonListeElement } from './ansatt-invitasjon-liste-element/AnsattInvitasjonListeElement'
import { Spinner } from '../../component/spinner/Spinner'

export const TilgangskontrollPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()

	const [ failedToFetch, setFailedToFetch ] = useState<boolean>(false)

	const gjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(() => fetchGjennomforing(gjennomforingId!))
	const ansattTilgangerPromise = usePromise<AxiosResponse<AnsattTilganger>>(() => fetchAnsattTilganger(gjennomforingId!))
	const ansattInvitasjonerPromise = usePromise<AxiosResponse<AnsattTilgangInvitasjoner>>(() => fetchTilgangInvitasjoner(gjennomforingId!))

	if(
		isNotStartedOrPending(gjennomforingPromise)
		|| isNotStartedOrPending(ansattTilgangerPromise)
		|| isNotStartedOrPending(ansattInvitasjonerPromise)
	)
		return <Spinner/>

	if(
		isRejected(gjennomforingPromise)
		|| isRejected(ansattTilgangerPromise)
		|| isRejected(ansattInvitasjonerPromise)
		|| failedToFetch
	)
		return <Alert variant="error">En feil har oppstått</Alert>

	const slettTilgang = (tilgangId: string) => {
		stopAnsattTilgang(tilgangId)
			.then(() => ansattTilgangerPromise.setPromise(fetchAnsattTilganger(gjennomforingId!)))
			.catch(() => setFailedToFetch(true))
	}

	const onGodkjennInvitasjon = (invitasjonId: string) => {
		godkjennInvitasjon(invitasjonId)
			.then(() => ansattInvitasjonerPromise.setPromise(fetchTilgangInvitasjoner(gjennomforingId!)))
			.catch(() => setFailedToFetch(true))
	}

	const onAvbrytInvitasjon = (invitasjonId: string) => {
		avbrytInvitasjon(invitasjonId)
			.then(() => ansattInvitasjonerPromise.setPromise(fetchTilgangInvitasjoner(gjennomforingId!)))
			.catch(() => setFailedToFetch(true))
	}

	const onOpprettInvitasjon = () => {
		opprettInvitasjon()
			.then(() => ansattInvitasjonerPromise.setPromise(fetchTilgangInvitasjoner(gjennomforingId!)))
			.catch(() => setFailedToFetch(true))
	}


	const gjennomforing = gjennomforingPromise.result.data
	const tilganger = ansattTilgangerPromise.result?.data ?? []
	const invitasjoner = ansattInvitasjonerPromise.result?.data ?? []

	const tilgangerOgInvitasjonerListeElementer = [
		...invitasjoner.map(i => (
			<AnsattInvitasjonListeElement
				ansattInvitasjon={i}
				onGodkjennInvitasjon={onGodkjennInvitasjon}
				onAvbrytInvitasjon={onAvbrytInvitasjon}
				key={i.id}
			/>
		)),
		...tilganger.map(t => <AnsattTilgangListeElement ansattTilgang={t} onSlettTilgang={slettTilgang} key={t.id}/>)
	]

	return (
		<main className={styles.page}>
			<Tilbakelenke to={gjennomforingDetaljerPageUrl(gjennomforingId!)} className={globalStyles.blokkS}/>

			<Heading level="1" size="medium" className={globalStyles.blokkXs}>Tilgangskontroll for koordinator</Heading>

			<div className={globalStyles.blokkXl}>
				<Heading level="2" size="xsmall" spacing>{gjennomforing.navn}</Heading>
				<BodyShort>Organisasjonsnavn: {gjennomforing.arrangor.organisasjonNavn}</BodyShort>
			</div>


			<div className={globalStyles.blokkM}>
				<Heading level="2" size="xsmall" spacing>Hvem skal ha tilgang til gjennomføringen av dette tiltaket?</Heading>
				{
					tilgangerOgInvitasjonerListeElementer.length > 0
						? (<ul className={styles.liste}>{tilgangerOgInvitasjonerListeElementer}</ul>)
						: (<BodyShort>Ingen koordinatorer registrert</BodyShort>)
				}
			</div>

			<Button type="button" variant="secondary" onClick={onOpprettInvitasjon}>
				<Add/> Legg til koordinator
			</Button>
		</main>
	)
}