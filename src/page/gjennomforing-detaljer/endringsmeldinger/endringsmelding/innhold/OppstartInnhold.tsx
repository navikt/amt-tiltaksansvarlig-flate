import { BodyShort, Detail } from '@navikt/ds-react'
import React from 'react'

import { EndringsmeldingStatus } from '../../../../../api/schema/endringsmelding'
import { beregnSluttDato, formatDate } from '../../../../../utils/date-utils'
import styles from '../Endringsmelding.module.scss'
import { Varighet } from '../VarighetSelect'


interface Props {
	oppstartsdato: Date
	status: EndringsmeldingStatus
	varighet: Varighet | null
}

export const OppstartInnhold = ({ oppstartsdato, status, varighet }: Props): React.ReactElement => {
	return (
		<div>
			<BodyShort size="small" className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(oppstartsdato)}</BodyShort>
			{status === EndringsmeldingStatus.AKTIV && varighet !== null && (
				<Detail className={styles.sluttdato}>
					Foreslått sluttdato: {formatDate(beregnSluttDato(oppstartsdato, varighet))}
				</Detail>
			)}
		</div>
	)
}


