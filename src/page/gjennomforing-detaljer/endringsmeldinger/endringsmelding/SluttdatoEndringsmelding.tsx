import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { Endringsmelding } from './Endringsmelding'
import { formatDate } from '../../../../utils/date-utils'
import { EndringsmeldingType } from '../../../../api/api'

interface IProps {
	endringsmelding: EndringsmeldingType,
	onFerdig: () => void
	className?: string 
}

export const SluttdatoEndringsmelding = ({ endringsmelding, onFerdig, className }: IProps): React.ReactElement => {
	return (
		<Endringsmelding endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
			<PanelLinje>
				<BodyShort className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(endringsmelding.sluttDato)}</BodyShort>
			</PanelLinje>
		</Endringsmelding>
	)
}
