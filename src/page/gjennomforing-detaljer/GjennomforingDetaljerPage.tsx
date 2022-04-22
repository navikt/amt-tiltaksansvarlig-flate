import { Alert, BodyLong, Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingGenerellInfo } from '../../component/GjennomforingGenerellInfo'
import { useParams } from 'react-router-dom'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { fetchGjennomforing, GjennomforingDetaljer } from '../../api/api'
import { AxiosResponse } from 'axios'
import styles from './GjennomforingDetaljerPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilgangskontroll } from './tilgangskontroll/Tilgangskontroll'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Endringsmeldinger } from './Endringsmeldinger'

export const GjennomforingDetaljerPage = () : React.ReactElement => {
	const { gjennomforingId } = useParams()
	const gjennomforingPromise = usePromise<AxiosResponse<GjennomforingDetaljer>>(() => fetchGjennomforing(gjennomforingId!))

	if (isNotStartedOrPending(gjennomforingPromise)) return <Loader/>
	if (isRejected(gjennomforingPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const gjennomforing = gjennomforingPromise.result.data

	return (
		<main className={styles.page}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading size="large">{gjennomforing.navn}</Heading>

			<GjennomforingGenerellInfo gjennomforing={gjennomforing} className={globalStyles.blokkM}/>

			<Tilgangskontroll className={globalStyles.blokkM} />

			<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>
			<BodyLong size="small" spacing>Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker, så kommer det en ny melding her. Oppstartsdatoen skal legges inn i Arena. </BodyLong>
			<Endringsmeldinger gjennomforingId={gjennomforingId!}/>

		</main>
	)
}