import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { EndringsmeldingStatus, LeggTilOppstartsdatoEndringsmelding } from '../../../../../api/schema/endringsmelding'
import { PanelLinje } from '../PanelLinje'


interface IProps {
	oppstartsdato: Date
	status: EndringsmeldingStatus
	varighet: number
	className?: string
}

export const LeggTilOppstartsdatoInnhold = ({ endringsmelding, varighet, className }: IProps): React.ReactElement => {
	const startdato = endringsmelding.innhold.oppstartsdato
	return (
		<div>
			<PanelLinje>
				<BodyShort className={styles.endringInfoTekst}>Ny oppstartsdato: {formatDate(startdato)}</BodyShort>
			</PanelLinje>
			{endringsmelding.status === EndringsmeldingStatus.AKTIV && varighet != null && (
				<PanelLinje>
					<Detail size="small" className={styles.sluttdato}>
						Foreslått sluttdato: {formatDate(startdato ? beregnSluttDato(startdato, varighet) : null)}
					</Detail>
				</PanelLinje>
			)}
		</div>
	)
}
