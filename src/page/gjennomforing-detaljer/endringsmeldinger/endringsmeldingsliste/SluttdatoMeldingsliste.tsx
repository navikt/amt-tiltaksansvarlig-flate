import React from 'react'
import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import { UsePromise } from '../../../../utils/use-promise'
import styles from '../Endringsmeldinger.module.scss'
import { EndringsmeldingType } from '../../../../api/api'
import { Meldingsliste } from './Meldingsliste'
import { SluttdatoEndringsmelding } from '../endringsmelding/SluttdatoEndringsmelding'

interface MeldingerProps {
	aktiveMeldinger: EndringsmeldingType[]
	inaktiveMeldinger: EndringsmeldingType[]
	refresh: () => void
	endringsmeldingerPromise: UsePromise<AxiosResponse>
}


export const SluttdatoMeldingsliste = ({
	aktiveMeldinger,
	inaktiveMeldinger,
	refresh,
	endringsmeldingerPromise
}: MeldingerProps) => {
	const aktiveMeldingerVisning = aktiveMeldinger.length === 0
		? <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
		: aktiveMeldinger.map(e => (
			<SluttdatoEndringsmelding
				className={styles.ikkeArkivertPadding}
				endringsmelding={e}
				onFerdig={refresh}
				key={e.id}
			/>
		))

	const inaktiveMeldingerVisning = inaktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
		: inaktiveMeldinger.map(e => <SluttdatoEndringsmelding endringsmelding={e} onFerdig={refresh} key={e.id} />)

	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Sluttdato</Heading>
			<BodyLong size="small" className={styles.spaceBottom}>
				Når tiltaksarrangøren oppdaterer sluttdato til en deltaker for å informere om forlengelse eller avslutning, så kommer det en ny melding her. Sluttdatoen skal legges inn i Arena.
			</BodyLong>
			<Meldingsliste endringsmeldingerPromise={endringsmeldingerPromise} aktiveMeldingerVisning={aktiveMeldingerVisning} inaktiveMeldingerVisning={inaktiveMeldingerVisning} />
		</div>
	)
}
