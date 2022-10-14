import React from 'react'
import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import styles from '../Endringsmeldinger.module.scss'
import { useLagretVarighet } from '../endringsmelding/useLagretVarighet'
import { StartdatoEndringsmelding, StartdatoEndringsmeldingPanel } from '../endringsmelding/StartdatoEndringsmeldingPanel'
import { VarighetSelect } from '../endringsmelding/VarighetSelect'
import { Meldingsliste } from './Meldingsliste'
import { sorterEndringsmeldingNyestFørst } from '../utils'

const DEFAULT_VARIGHET_MANEDER = 6

interface MeldingerProps {
	meldinger: StartdatoEndringsmelding[]
	refresh: () => void
}

export const StartdatoMeldingsliste = ({
	meldinger,
	refresh,
}: MeldingerProps) => {
	const [ varighet, setVarighet ] = useLagretVarighet(DEFAULT_VARIGHET_MANEDER)
	const aktiveMeldinger = meldinger.filter(e => e.aktiv).sort(sorterEndringsmeldingNyestFørst)
	const inaktiveMeldinger = meldinger.filter(e => !e.aktiv).sort(sorterEndringsmeldingNyestFørst)

	const aktiveMeldingerVisning = aktiveMeldinger.length === 0
		? <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
		: aktiveMeldinger.map(e => (
			<StartdatoEndringsmeldingPanel
				className={styles.ikkeArkivertPadding}
				endringsmelding={e}
				varighet={varighet}
				onFerdig={refresh}
				key={e.id}
			/>
		))

	const inaktiveMeldingerVisning = inaktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
		: inaktiveMeldinger.map(e => <StartdatoEndringsmeldingPanel endringsmelding={e} onFerdig={refresh} key={e.id} varighet={varighet} />)

	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Oppstartsdato</Heading>
			<BodyLong size="small">
				Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker, så kommer det en ny melding her.
				Den valgte varigheten gir forslag om sluttdato. Datoene legges inn i Arena.
			</BodyLong>
			<VarighetSelect selectedValue={varighet} setVarighet={setVarighet} />
			<Meldingsliste aktiveMeldingerVisning={aktiveMeldingerVisning} inaktiveMeldingerVisning={inaktiveMeldingerVisning} />
		</div>
	)
}
