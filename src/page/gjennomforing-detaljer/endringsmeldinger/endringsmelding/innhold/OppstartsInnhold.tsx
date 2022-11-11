import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { EndringsmeldingStatus } from '../../../../../api/schema/endringsmelding'
import { PanelLinje } from '../PanelLinje'
import styles from '../Endringsmelding.module.scss'
import { beregnSluttDato, formatDate } from '../../../../../utils/date-utils'


interface IProps {
	oppstartsdato: Date
	status: EndringsmeldingStatus
	varighet: number
}

export const OppstartsInnhold = ({ oppstartsdato, status, varighet }: IProps): React.ReactElement => {
	return (
		<div>
			<PanelLinje>
				<BodyShort size="small" className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(oppstartsdato)}</BodyShort>
			</PanelLinje>
			{status === EndringsmeldingStatus.AKTIV && varighet !== undefined && (
				<PanelLinje>
					<Detail size="small" className={styles.sluttdato}>
						Foreslått sluttdato: {formatDate(oppstartsdato ? beregnSluttDato(oppstartsdato, varighet) : null)}
					</Detail>
				</PanelLinje>
			)}
		</div>
	)
}
