import React, { useState } from 'react'

import styles from './TilgangskontrollPage.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { gjennomforingDetaljerPageUrl } from '../../navigation'
import { useParams } from 'react-router-dom'
import { Alert, BodyShort, Button, Heading } from '@navikt/ds-react'
import { Add } from '@navikt/ds-icons'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { fetchGjennomforing, GjennomforingDetaljer, opprettInvitasjon } from '../../api/api'
import globalStyles from '../../globals.module.scss'
import { Spinner } from '../../component/spinner/Spinner'
import { TilgangskontrollListe } from './tilgangskontroll-liste/TilgangskontrollListe'

export const TilgangskontrollPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()
	const [ listeKey, setListeKey ] = useState(0)
	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljer>>(() => fetchGjennomforing(gjennomforingId!))

	if (!gjennomforingId) return <Alert variant="info">Gjennomføring ikke valgt</Alert>

	if (isNotStartedOrPending(gjennomforingPromise)) return <Spinner/>

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const onOpprettInvitasjon = () => {
		opprettInvitasjon(gjennomforingId)
			.then(() => setListeKey(k => k + 1))
			.catch()
	}

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page}>
			<Tilbakelenke to={gjennomforingDetaljerPageUrl(gjennomforingId)} className={globalStyles.blokkS}/>

			<Heading level="1" size="medium" className={globalStyles.blokkXs}>Tilgangskontroll for koordinator</Heading>

			<div className={globalStyles.blokkXl}>
				<Heading level="2" size="xsmall" spacing>{gjennomforing.navn}</Heading>
				<BodyShort>Organisasjonsnavn: {gjennomforing.arrangor.organisasjonNavn}</BodyShort>
			</div>

			<div className={globalStyles.blokkM}>
				<Heading level="2" size="xsmall" spacing>Hvem skal ha tilgang til gjennomføringen av dette tiltaket?</Heading>
				<TilgangskontrollListe gjennomforingId={gjennomforingId} key={listeKey} />
			</div>

			<Button type="button" variant="secondary" onClick={onOpprettInvitasjon}>
				<Add/> Legg til koordinator
			</Button>
		</main>
	)
}