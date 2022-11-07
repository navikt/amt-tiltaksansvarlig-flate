import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'
import { formatDate } from '../../../../utils/date-utils'
import { AvsluttDeltakelseEndringsmelding } from '../../../../api/schema/endringsmelding'


interface IProps {
	endringsmelding: AvsluttDeltakelseEndringsmelding,
	onFerdig: () => void
	className?: string
}

export const SluttdatoEndringsmeldingPanel = ({ endringsmelding, onFerdig, className }: IProps): React.ReactElement => {
	return (
		<EndringsmeldingPanel endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
			<PanelLinje className={styles.spaceTop}>
				<BodyShort className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}</BodyShort>
			</PanelLinje>
		</EndringsmeldingPanel>
	)
}
