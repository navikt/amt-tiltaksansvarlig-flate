import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import { fetchGjennomforing } from '../../api/api'
import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import globalStyles from '../../globals.module.scss'
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
		error
	} = useFetch(fetchGjennomforing, gjennomforingId)


	if (loading) return <Loader/>

	if (error || !gjennomforing) return <Alert variant="error">En feil har oppstått</Alert>

	return (
		<main className={styles.page} data-testid="gjennomforing-detaljer-page">
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading gjennomforingId={gjennomforing.id} gjennomforingNavn={gjennomforing.navn}/>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkL}/>

			<MeldingerFraArrangor gjennomforingId={gjennomforingId} tiltaksKode={gjennomforing.tiltak.kode}/>
		</main>
	)
}
