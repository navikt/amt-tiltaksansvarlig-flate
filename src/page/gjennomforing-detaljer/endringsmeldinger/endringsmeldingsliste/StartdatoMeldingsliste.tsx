import React from 'react'
import { Alert, BodyLong, Heading } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import { UsePromise } from '../../../../utils/use-promise'
import styles from '../Endringsmeldinger.module.scss'
import { EndringsmeldingType } from '../../../../api/api'
import { useLagretVarighet } from '../endringsmelding/useLagretVarighet'
import { StartdatoEndringsmelding } from '../endringsmelding/StartdatoEndringsmelding'
import { VarighetSelect } from '../endringsmelding/VarighetSelect'
import { Meldingsliste } from './Meldingsliste'

const DEFAULT_VARIGHET_MANEDER = 6

interface MeldingerProps {
	aktiveMeldinger: EndringsmeldingType[]
	inaktiveMeldinger: EndringsmeldingType[]
	refresh: () => void
	endringsmeldingerPromise: UsePromise<AxiosResponse>
}

export const StartdatoMeldingsliste = ({
	aktiveMeldinger,
	inaktiveMeldinger,
	refresh,
	endringsmeldingerPromise
}: MeldingerProps) => {
	const [ varighet, setVarighet ] = useLagretVarighet(DEFAULT_VARIGHET_MANEDER)

	const aktiveMeldingerVisning = aktiveMeldinger.length === 0
		? <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
		: aktiveMeldinger.map(e => (
			<StartdatoEndringsmelding
				className={styles.ikkeArkivertPadding}
				endringsmelding={e}
				varighet={varighet}
				onFerdig={refresh}
				key={e.id}
			/>
		))

	const inaktiveMeldingerVisning = inaktiveMeldinger.length === 0
		? <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
		: inaktiveMeldinger.map(e => <StartdatoEndringsmelding endringsmelding={e} onFerdig={refresh} key={e.id} varighet={varighet} />)

	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Oppstartsdato</Heading>
			<BodyLong size="small">
				Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker, så kommer det en ny melding her.
				Den valgte varigheten gir forslag om sluttdato. Datoene legges inn i Arena.
			</BodyLong>
			<VarighetSelect selectedValue={varighet} setVarighet={setVarighet} />
			<Meldingsliste endringsmeldingerPromise={endringsmeldingerPromise} aktiveMeldingerVisning={aktiveMeldingerVisning} inaktiveMeldingerVisning={inaktiveMeldingerVisning} />
		</div>
	)
}
