import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { Endringsmelding, EndringsmeldingPanel } from './EndringsmeldingPanel'
import { beregnSluttDato, formatDate } from '../../../../utils/date-utils'

export interface StartdatoEndringsmelding extends Endringsmelding {
	startdato: Date
}

interface IProps {
	endringsmelding: StartdatoEndringsmelding,
	onFerdig: () => void
	varighet: number | null,
	className?: string 
}

export const StartdatoEndringsmeldingPanel = ({ endringsmelding, varighet, onFerdig, className }: IProps): React.ReactElement => {
	return (
		<EndringsmeldingPanel endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
			<div>
				<PanelLinje>
					<BodyShort className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(endringsmelding.startdato)}</BodyShort>
				</PanelLinje>
				{endringsmelding.aktiv && varighet != null && (
					<PanelLinje>
						<Detail size="small" className={styles.sluttdato}>
							Foreslått sluttdato: {formatDate(endringsmelding.startdato ? beregnSluttDato(endringsmelding.startdato, varighet) : null)}
						</Detail>
					</PanelLinje>
				)}
			</div>
		</EndringsmeldingPanel>
	)
}
