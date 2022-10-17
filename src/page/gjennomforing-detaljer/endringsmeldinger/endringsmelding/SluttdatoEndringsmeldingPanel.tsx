import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { Endringsmelding, EndringsmeldingPanel } from './EndringsmeldingPanel'
import { formatDate } from '../../../../utils/date-utils'

export interface SluttdatoEndringsmelding extends Endringsmelding {
	sluttdato: Date
}

interface IProps {
	endringsmelding: SluttdatoEndringsmelding,
	onFerdig: () => void
	className?: string 
}

export const SluttdatoEndringsmeldingPanel = ({ endringsmelding, onFerdig, className }: IProps): React.ReactElement => {
	return (
		<EndringsmeldingPanel endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
			<PanelLinje className={styles.spaceTop}>
				<BodyShort className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(endringsmelding.sluttdato)}</BodyShort>
			</PanelLinje>
		</EndringsmeldingPanel>
	)
}
