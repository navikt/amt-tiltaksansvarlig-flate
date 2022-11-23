import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { EndringsmeldingStatus } from '../../../../../api/schema/endringsmelding'
import { PanelLinje } from '../PanelLinje'
import styles from '../Endringsmelding.module.scss'
import { beregnSluttDato, formatDate } from '../../../../../utils/date-utils'
import { Varighet } from '../VarighetSelect'


interface Props {
	oppstartsdato: Date
	status: EndringsmeldingStatus
	varighet: Varighet | null
}

export const OppstartInnhold = ({ oppstartsdato, status, varighet }: Props): React.ReactElement => {
	return (
		<div>
			<PanelLinje>
				<BodyShort size="small" className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(oppstartsdato)}</BodyShort>
			</PanelLinje>
			{status === EndringsmeldingStatus.AKTIV && varighet !== null && (
				<PanelLinje>
					<Detail size="small" className={styles.sluttdato}>
						Foreslått sluttdato: {formatDate(beregnSluttDato(oppstartsdato, varighet))}
					</Detail>
				</PanelLinje>
			)}
		</div>
	)
}


