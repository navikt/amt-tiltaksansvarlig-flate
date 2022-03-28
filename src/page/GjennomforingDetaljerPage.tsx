import { Alert, Heading, Link, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import { isNotStartedOrPending, isRejected, usePromise } from '../utils/use-promise'
import { fetchGjennomforing, Gjennomforing } from '../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import { DeltakerPanel } from '../component/DeltakerPanel'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()
	const gjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(() => fetchGjennomforing(gjennomforingId!))
	const gjennomforing = gjennomforingPromise.result?.data

	if(isNotStartedOrPending(gjennomforingPromise)) return <Loader/>
	if(isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	return (
		<main className={styles.page}>
			<Link href="/" className={styles.tilbakeKnapp}>Tilbake</Link>
			<Heading size="large">{gjennomforing?.navn}</Heading>
			<GjennomforingGenerellInfo gjennomforing={gjennomforing!}/>
			<DeltakerPanel />
		</main>
	)
}