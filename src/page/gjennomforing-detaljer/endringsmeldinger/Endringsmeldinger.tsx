import React from 'react'
import { usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { Alert, Heading } from '@navikt/ds-react'
import { EndringsmeldingerType, EndringsmeldingType, fetchEndringsmeldinger } from '../../../api/api'
import globalStyles from '../../../globals.module.scss'
import styles from './Endringsmeldinger.module.scss'
import { useDataStore } from '../../../store/data-store'
import { harTilgangTilEndringsmelding } from '../../../utils/tilgang-utils'
import { StartdatoMeldingsliste } from './endringsmeldingsliste/StartdatoMeldingsliste'
import { SluttdatoMeldingsliste } from './endringsmeldingsliste/SluttdatoMeldingsliste'

interface EndringsmeldingerProps {
	gjennomforingId: string
}

const sorterEndringsmeldingNyestFørst = (e1: EndringsmeldingType, e2: EndringsmeldingType): number => {
	return e1.opprettetDato > e2.opprettetDato ? -1 : 1
}

export const Endringsmeldinger = (props: EndringsmeldingerProps) => {
	const { innloggetAnsatt } = useDataStore()
	const endringsmeldingerPromise = usePromise<AxiosResponse<EndringsmeldingerType>>(() => fetchEndringsmeldinger(props.gjennomforingId))

	const aktiveMeldinger = endringsmeldingerPromise.result?.data
		.filter(e => e.aktiv)
		.sort(sorterEndringsmeldingNyestFørst) ?? []

	const inaktiveMeldinger = endringsmeldingerPromise.result?.data
		.filter(e => !e.aktiv)
		.sort(sorterEndringsmeldingNyestFørst) ?? []

	const harTilgang = harTilgangTilEndringsmelding(innloggetAnsatt.tilganger)


	const refresh = () => {
		endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(props.gjennomforingId))
	}

	return (
		<section className={globalStyles.blokkL}>
			<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>

			{
				harTilgang
					? (
						<div>
							<StartdatoMeldingsliste
								aktiveMeldinger={aktiveMeldinger.filter(e => e.startDato)}
								inaktiveMeldinger={inaktiveMeldinger.filter(e => e.startDato)}
								refresh={refresh}
								endringsmeldingerPromise={endringsmeldingerPromise}
							/>
							<SluttdatoMeldingsliste
								aktiveMeldinger={aktiveMeldinger.filter(e => e.sluttDato)}
								inaktiveMeldinger={inaktiveMeldinger.filter(e => e.sluttDato)}
								refresh={refresh}
								endringsmeldingerPromise={endringsmeldingerPromise}
							/>
						</div>
					)
					: (
						<Alert className={styles.ikkeTilgangAlert} variant="info" size="small">
							Du har ikke tilgang til å se endringsmeldinger.
						</Alert>
					)
			}
		</section>
	)
}
