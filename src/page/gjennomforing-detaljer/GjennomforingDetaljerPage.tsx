import { Alert, BodyLong, Button, Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import { isNotStartedOrPending, isPending, isRejected, isResolved, usePromise } from '../../utils/use-promise'
import { fetchGjennomforing, stopTilgangTilGjennomforing, GjennomforingDetaljerType } from '../../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilgangskontroll } from './tilgangskontroll/Tilgangskontroll'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Endringsmeldinger } from './Endringsmeldinger'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()

	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljerType>>(() => fetchGjennomforing(gjennomforingId!))
	const fjernFraMinOversiktPromise = usePromise<AxiosResponse>()

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader/>

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const handleFjernFraMinOversikt = () => {
		fjernFraMinOversiktPromise.setPromise(() => stopTilgangTilGjennomforing(gjennomforingId!))
	}

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading size="large">{gjennomforing.navn}</Heading>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkM}/>

			<Tilgangskontroll className={globalStyles.blokkM} />

			<section className={globalStyles.blokkL}>
				<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>
				<BodyLong size="small" spacing>Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker, så kommer det en ny melding her. Oppstartsdatoen skal legges inn i Arena. </BodyLong>
				<Endringsmeldinger gjennomforingId={gjennomforingId!}/>
			</section>

			<div className={styles.seperator}/>

			<section className={styles.fjernFraMinOversiktSection}>
				<Heading size="small" level="2" className={globalStyles.blokkXs}>
					Tiltaket er lagret i Min Tiltaksoversikt
				</Heading>

				<Button
					variant="secondary"
					size="small"
					onClick={handleFjernFraMinOversikt}
					className={globalStyles.blokkXs}
					loading={isPending(fjernFraMinOversiktPromise)}
					disabled={isPending(fjernFraMinOversiktPromise) || isResolved(fjernFraMinOversiktPromise)}
				>
					Fjern fra min oversikt
				</Button>

				{
					isResolved(fjernFraMinOversiktPromise) &&
					(<Alert variant="success" className={styles.alert}>Tiltaket er fjernet fra oversikten</Alert>)
				}
			</section>
		</main>
	)
}