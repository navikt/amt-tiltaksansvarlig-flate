import { Alert, Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { fetchGjennomforing, Gjennomforing } from '../../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilgangskontroll } from './tilgangskontroll/Tilgangskontroll'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { appUrl } from '../../utils/url-utils'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()
	const gjennomforingPromise = usePromise<AxiosResponse<Gjennomforing>>(() => fetchGjennomforing(gjennomforingId!))
	const gjennomforing = gjennomforingPromise.result?.data

	if(isNotStartedOrPending(gjennomforingPromise)) return <Loader/>
	if(isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	return (
		<main className={styles.page}>
			<Tilbakelenke to={appUrl(FORSIDE_PAGE_ROUTE)} className={globalStyles.blokkM}/>
			<Heading size="large">{gjennomforing?.navn}</Heading>
			<GjennomforingGenerellInfo gjennomforing={gjennomforing!} className={globalStyles.blokkM}/>
			<Tilgangskontroll className={styles.tilgangskontroll} />
		</main>
	)
}