import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { Endringsmelding } from './Endringsmelding'
import { beregnSluttDato, formatDate } from '../../../../utils/date-utils'
import { EndringsmeldingType } from '../../../../api/api'

interface IProps {
	endringsmelding: EndringsmeldingType,
	onFerdig: () => void
	varighet: number,
	className?: string 
}

export const StartdatoEndringsmelding = ({ endringsmelding, varighet, onFerdig, className }: IProps): React.ReactElement => {
	return (
		<Endringsmelding endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
			<div>
				<PanelLinje>
					<BodyShort className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(endringsmelding.startDato)}</BodyShort>
				</PanelLinje>
				{endringsmelding.aktiv && (
					<PanelLinje>
						<Detail size="small" className={styles.sluttdato}>
							Foreslått sluttdato: {formatDate(endringsmelding.startDato ? beregnSluttDato(endringsmelding.startDato, varighet) : null)}
						</Detail>
					</PanelLinje>
				)}
			</div>
		</Endringsmelding>
	)
}
