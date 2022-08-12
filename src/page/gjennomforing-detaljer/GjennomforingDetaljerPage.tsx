import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import {
	isNotStartedOrPending,
	isRejected,
	usePromise
} from '../../utils/use-promise'
import { fetchGjennomforing, GjennomforingDetaljerType } from '../../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'
import cls from 'classnames'
import { Heading } from './heading/Heading'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()

	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljerType>>(() => fetchGjennomforing(gjennomforingId!))

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader/>

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page} data-testid="gjennomforing-detaljer-page">
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading gjennomforingId={gjennomforing.id} gjennomforingNavn={gjennomforing.navn} />

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkL}/>

			<div className={cls(styles.seperator, globalStyles.blokkL)}/>

			<Endringsmeldinger gjennomforingId={gjennomforingId!}/>
		</main>
	)
}