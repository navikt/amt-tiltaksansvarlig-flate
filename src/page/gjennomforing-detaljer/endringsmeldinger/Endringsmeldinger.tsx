import React, { useEffect, useState } from 'react'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { Alert, Heading } from '@navikt/ds-react'
import { fetchEndringsmeldinger } from '../../../api/api'
import globalStyles from '../../../globals.module.scss'
import styles from './Endringsmeldinger.module.scss'
import { useDataStore } from '../../../store/data-store'
import { harTilgangTilEndringsmelding } from '../../../utils/tilgang-utils'
import { Spinner } from '../../../component/spinner/Spinner'
import { Endringsmelding } from '../../../api/schema/endringsmelding'
import { EndringsmeldingListe } from './endringsmeldingsliste/EndringsmeldingListe'

interface EndringsmeldingerProps {
	gjennomforingId: string
}

export const Endringsmeldinger = (props: EndringsmeldingerProps) => {
	const { innloggetAnsatt } = useDataStore()
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>([])
	const endringsmeldingerPromise = usePromise<AxiosResponse<Endringsmelding[]>>()
	const harTilgang = harTilgangTilEndringsmelding(innloggetAnsatt.tilganger)

	useEffect(() => {
		if (isResolved(endringsmeldingerPromise)) {
			setEndringsmeldinger(endringsmeldingerPromise.result.data)
		}
	}, [ endringsmeldingerPromise ])


	useEffect(() => {
		if (harTilgang) {
			endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(props.gjennomforingId))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ harTilgang ])

	const refresh = () => {
		endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(props.gjennomforingId))
	}

	const isLoading = isNotStartedOrPending(endringsmeldingerPromise)

	if (!harTilgang) {
		return (
			<Alert className={styles.errorAlert} variant="info" size="small">
				Du har ikke tilgang til å se endringsmeldinger.
			</Alert>
		)
	}

	if (isRejected(endringsmeldingerPromise)) {
		return (
			<Alert className={styles.errorAlert} variant="error" size="small">
				Klarte ikke å laste endringsmeldinger.
			</Alert>
		)
	}

	return (
		<section className={globalStyles.blokkL}>
			<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>
			{
				isLoading ? (
					<Spinner />
				) : (
					<EndringsmeldingListe
						gjennomforingId={props.gjennomforingId}
						meldinger={endringsmeldinger}
						refresh={refresh}
					/>
				)
			}

		</section>
	)
}
