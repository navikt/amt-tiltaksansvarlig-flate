import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

import { fetchGjennomforing } from '../../api/api'
import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import globalStyles from '../../globals.module.scss'
import { HasTilgangGuard } from '../../guards/hasTilgangGuard'
import useFetch from '../../hooks/useFetch'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import styles from './GjennomforingDetaljerPage.module.scss'
import { Heading } from './heading/Heading'
import { MeldingerFraArrangor } from './MeldingerFraArrangor'

export const GjennomforingDetaljerPage = (): React.ReactElement => {
	const params = useParams()
	const gjennomforingId = params.gjennomforingId ?? ''

	const {
		data: gjennomforing,
		loading,
		error,
		statusCode
	} = useFetch(fetchGjennomforing, gjennomforingId)

	if (loading) return <Loader/>

	if (statusCode === 403) {
		return (
			<Navigate to={FORSIDE_PAGE_ROUTE}/>
		)
	}

	if (error || !gjennomforing) return <Alert variant="error">En feil har oppstått</Alert>

	return (
		<main className={styles.page} data-testid="gjennomforing-detaljer-page">
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading gjennomforingId={gjennomforing.id} gjennomforingNavn={gjennomforing.navn}/>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkL}/>

			<HasTilgangGuard>
				<MeldingerFraArrangor gjennomforingId={gjennomforingId} tiltaksKode={gjennomforing.tiltak.kode}/>
			</HasTilgangGuard>
		</main>
	)
}
