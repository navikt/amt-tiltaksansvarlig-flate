import { Alert, Button, Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import {
	isFinished,
	isNotStartedOrPending,
	isPending,
	isRejected,
	isResolved,
	usePromise
} from '../../utils/use-promise'
import { fetchGjennomforing, fjernGjennomforingFraOversikten, GjennomforingDetaljerType } from '../../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'
import { Show } from '../../component/Show'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()

	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljerType>>(() => fetchGjennomforing(gjennomforingId!))
	const fjernFraOversiktenPromise = usePromise<AxiosResponse>()

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader/>

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const handleFjernFraMinOversikt = () => {
		fjernFraOversiktenPromise.setPromise(() => fjernGjennomforingFraOversikten(gjennomforingId!))
	}

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<div className={styles.heading}>
				<Heading size="medium" spacing>{gjennomforing.navn}</Heading>

				<Show if={isNotStartedOrPending(fjernFraOversiktenPromise)}>
					<Button
						variant="secondary"
						size="small"
						onClick={handleFjernFraMinOversikt}
						className={globalStyles.blokkXs}
						loading={isPending(fjernFraOversiktenPromise)}
						disabled={isPending(fjernFraOversiktenPromise) || isResolved(fjernFraOversiktenPromise)}
					>
						Fjern fra min oversikt
					</Button>
				</Show>

				<Show if={isFinished(fjernFraOversiktenPromise)}>
					{
						isResolved(fjernFraOversiktenPromise) &&
							(<Alert variant="success" size="small" className={styles.alert}>Tiltaket er fjernet fra oversikten</Alert>)
					}

					{
						isRejected(fjernFraOversiktenPromise) &&
							(<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>)
					}
				</Show>
			</div>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing}/>

			<Endringsmeldinger gjennomforingId={gjennomforingId!}/>
		</main>
	)
}