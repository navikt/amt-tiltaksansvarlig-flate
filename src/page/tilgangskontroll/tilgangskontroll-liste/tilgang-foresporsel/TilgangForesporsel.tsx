import React from 'react'
import { BodyShort, Button } from '@navikt/ds-react'
import styles from './TilgangForesporsel.module.scss'
import { TilgangForesporselType } from '../../../../api/api'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'


interface TilgangForesporselProps {
	foresporsel: TilgangForesporselType
	onGodkjennForesporsel: (foresporselId: string) => void,
	onAvvisForesporsel: (foresporselId: string) => void,
}

export const TilgangForesporsel = (props: TilgangForesporselProps): React.ReactElement<TilgangForesporselProps> => {
	const { foresporsel, onGodkjennForesporsel, onAvvisForesporsel } = props
	const { id, fodselsnummer, fornavn, mellomnavn, etternavn, opprettetDato } = foresporsel

	return (
		<div>
			<BodyShort className={styles.bold}>{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}</BodyShort>
			<BodyShort spacing>{fodselsnummer}</BodyShort>
			<BodyShort spacing>Bedt om tilgang: {formatDate(opprettetDato)}</BodyShort>

			<BodyShort spacing>Skal denne personen ha tilgang?</BodyShort>
			<div className={styles.valg}>
				<Button
					type="submit"
					variant="primary"
					onClick={() => onGodkjennForesporsel(id)}
				>
					Ja, gi tilgang
				</Button>

				<Button
					type="submit"
					variant="secondary"
					onClick={() => onAvvisForesporsel(id)}
				>
					Nei, det er feil
				</Button>
			</div>
		</div>
	)
}