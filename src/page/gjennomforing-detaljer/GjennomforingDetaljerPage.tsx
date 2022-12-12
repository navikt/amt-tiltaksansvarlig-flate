import { Alert, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchGjennomforing, GjennomforingDetaljer } from '../../api/api'
import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import globalStyles from '../../globals.module.scss'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import {
	isNotStartedOrPending,
	isRejected,
	usePromise
} from '../../utils/use-promise'
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'
import styles from './GjennomforingDetaljerPage.module.scss'
import { Heading } from './heading/Heading'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	const params = useParams()
	const gjennomforingId = params.gjennomforingId ?? ''

	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljer>>(() => fetchGjennomforing(gjennomforingId))

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader />

	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page} data-testid="gjennomforing-detaljer-page">
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM} />

			<Heading gjennomforingId={gjennomforing.id} gjennomforingNavn={gjennomforing.navn} />

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkL} />

			<div className={cls(styles.seperator, globalStyles.blokkL)} />

			<Endringsmeldinger gjennomforingId={gjennomforingId} />
		</main>
	)
}
