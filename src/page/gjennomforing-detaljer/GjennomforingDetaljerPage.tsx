import { Alert, Button, Heading, Loader } from '@navikt/ds-react'
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
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()

	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljerType>>(() => fetchGjennomforing(gjennomforingId!))
	const stopTilgangTilGjennomforingPromise = usePromise<AxiosResponse>()

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader/>

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const handleFjernFraMinOversikt = () => {
		stopTilgangTilGjennomforingPromise.setPromise(() => stopTilgangTilGjennomforing(gjennomforingId!))
	}

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading size="medium" spacing>{gjennomforing.navn}</Heading>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing}/>

			<Tilgangskontroll className={globalStyles.blokkM} />

			<Endringsmeldinger gjennomforingId={gjennomforingId!}/>

			<div className={styles.seperator}/>

			<section className={styles.fjernFraMinOversiktSection}>
				<Heading size="small" level="2" className={globalStyles.blokkXs}>
					Tiltaket er lagt til i oversikten
				</Heading>

				<Button
					variant="secondary"
					size="small"
					onClick={handleFjernFraMinOversikt}
					className={globalStyles.blokkXs}
					loading={isPending(stopTilgangTilGjennomforingPromise)}
					disabled={isPending(stopTilgangTilGjennomforingPromise) || isResolved(stopTilgangTilGjennomforingPromise)}
				>
					Fjern fra min oversikt
				</Button>

				{
					isResolved(stopTilgangTilGjennomforingPromise) &&
					(<Alert variant="success" className={styles.alert}>Tiltaket er fjernet fra oversikten</Alert>)
				}

				{
					isRejected(stopTilgangTilGjennomforingPromise) &&
					(<Alert variant="error" className={styles.alert}>Noe gikk galt</Alert>)
				}
			</section>
		</main>
	)
}