import React from 'react'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { Accordion, Alert, BodyLong, Heading } from '@navikt/ds-react'
import { EndringsmeldingerType, EndringsmeldingType, fetchEndringsmeldinger } from '../../../api/api'
import { Endringsmelding } from './endringsmelding/Endringsmelding'
import globalStyles from '../../../globals.module.scss'
import styles from './Endringsmeldinger.module.scss'
import { Spinner } from '../../../component/spinner/Spinner'
import classNames from 'classnames'

interface EndringsmeldingerProps {
	gjennomforingId: string
}

const sorterEndringsmeldingNyestFørst = (e1: EndringsmeldingType, e2: EndringsmeldingType): number => {
	return e1.opprettetDato > e2.opprettetDato ? -1 : 1
}

export const Endringsmeldinger = ({ gjennomforingId }: EndringsmeldingerProps) => {
	const endringsmeldingerPromise = usePromise<AxiosResponse<EndringsmeldingerType>>(() => fetchEndringsmeldinger(gjennomforingId!))

	const aktiveMeldinger = endringsmeldingerPromise.result?.data
		.filter(e => e.aktiv)
		.sort(sorterEndringsmeldingNyestFørst) ?? []

	const inaktiveMeldinger = endringsmeldingerPromise.result?.data
		.filter(e => !e.aktiv)
		.sort(sorterEndringsmeldingNyestFørst) ?? []

	const refresh = () => {
		endringsmeldingerPromise.setPromise(fetchEndringsmeldinger(gjennomforingId!))
	}

	const aktiveMeldingerVisning = aktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Det er ingen nye meldinger om deltakere.</Alert>
		: aktiveMeldinger.map(e => <Endringsmelding className={styles.ikkeArkivertPadding} endringsmelding={e} onFerdig={refresh} key={e.id}/>)

	const inaktiveMeldingerVisning = inaktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
		: inaktiveMeldinger.map(e => <Endringsmelding endringsmelding={e} onFerdig={refresh} key={e.id}/>)

	return (
		<section className={globalStyles.blokkL}>
			<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>
			<BodyLong size="small" spacing>
				Når tiltaksarrangøren sender en oppstartsdato, så kommer det en ny melding her.
				Oppstartsdatoen skal registreres i Arena.
			</BodyLong>

			{
				isNotStartedOrPending(endringsmeldingerPromise)
					? <Spinner/>
					: aktiveMeldingerVisning
			}

			{ isRejected(endringsmeldingerPromise) && <Alert variant="error">En feil har oppstått</Alert> }

			<Accordion className={styles.spaceTop}>
				<Accordion.Item>
					<Accordion.Header className={classNames(styles.noBottomBorder, styles.header)}>
						Meldinger som er markert ferdig
					</Accordion.Header>
					<Accordion.Content className={styles.noBottomBorder}>
						{
							isNotStartedOrPending(endringsmeldingerPromise)
								? <Spinner/>
								: inaktiveMeldingerVisning
						}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</section>
	)
}
