import React from 'react'
import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import styles from '../Endringsmeldinger.module.scss'
import { Meldingsliste } from './Meldingsliste'
import { SluttdatoEndringsmeldingPanel } from '../endringsmelding/SluttdatoEndringsmeldingPanel'
import { sorterEndringsmeldingNyestFørst } from '../utils'
import { AvsluttDeltakelseEndringsmelding, EndringsmeldingStatus } from '../../../../api/schema/endringsmelding'

interface MeldingerProps {
	meldinger: AvsluttDeltakelseEndringsmelding[]
	refresh: () => void
}


export const SluttdatoMeldingsliste = ({
	meldinger,
	refresh,
}: MeldingerProps) => {
	const aktiveMeldinger = meldinger.filter(e => e.status === EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldingNyestFørst)
	const inaktiveMeldinger = meldinger.filter(e => e.status !== EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldingNyestFørst)

	const aktiveMeldingerVisning = aktiveMeldinger.length === 0
		? <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
		: aktiveMeldinger.map(e => (
			<SluttdatoEndringsmeldingPanel
				className={styles.ikkeArkivertPadding}
				endringsmelding={e}
				onFerdig={refresh}
				key={e.id}
			/>
		))

	const inaktiveMeldingerVisning = inaktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
		: inaktiveMeldinger.map(e => <SluttdatoEndringsmeldingPanel endringsmelding={e} onFerdig={refresh} key={e.id} />)

	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Sluttdato</Heading>
			<BodyLong size="small" className={styles.spaceBottom}>
				Når tiltaksarrangøren oppdaterer sluttdato til en deltaker for å informere om forlengelse eller avslutning, så kommer det en ny melding her. Sluttdatoen skal legges inn i Arena.
			</BodyLong>
			<Meldingsliste aktiveMeldingerVisning={aktiveMeldingerVisning} inaktiveMeldingerVisning={inaktiveMeldingerVisning} />
		</div>
	)
}
