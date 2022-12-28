import { Alert, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'

import { fetchEndringsmeldinger } from '../../../api/api'
import { Endringsmelding } from '../../../api/schema/endringsmelding'
import { Spinner } from '../../../component/spinner/Spinner'
import globalStyles from '../../../globals.module.scss'
import { getStatusCode } from '../../../utils/error-utils'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import styles from './Endringsmeldinger.module.scss'
import { EndringsmeldingListe } from './endringsmeldingsliste/EndringsmeldingListe'

interface EndringsmeldingerProps {
	gjennomforingId: string
}

export const Endringsmeldinger = (props: EndringsmeldingerProps) => {
	const [ endringsmeldinger, setEndringsmeldinger ] = useState<Endringsmelding[]>([])
	const endringsmeldingerPromise = usePromise<AxiosResponse<Endringsmelding[]>>()

	useEffect(() => {
		if (isResolved(endringsmeldingerPromise)) {
			setEndringsmeldinger(endringsmeldingerPromise.result.data)
		}
	}, [ endringsmeldingerPromise ])


	useEffect(() => {
		endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(props.gjennomforingId))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const refresh = () => {
		endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(props.gjennomforingId))
	}

	const isLoading = isNotStartedOrPending(endringsmeldingerPromise)

	if (isRejected(endringsmeldingerPromise)) {
		if (getStatusCode(endringsmeldingerPromise.error) === 403) {
			return (
				<Alert className={styles.errorAlert} variant="info" size="small">
					Du har ikke tilgang til å se endringsmeldinger.
				</Alert>
			)
		}
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
