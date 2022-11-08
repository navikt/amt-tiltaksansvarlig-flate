import React from 'react'
import { BodyShort, Detail } from '@navikt/ds-react'
import { PanelLinje } from './PanelLinje'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingPanel } from './EndringsmeldingPanel'
import { beregnSluttDato, formatDate } from '../../../../utils/date-utils'
import { EndringsmeldingStatus, EndreOppstartsdatoEndringsmelding } from '../../../../api/schema/endringsmelding'


interface IProps {
	endringsmelding: EndreOppstartsdatoEndringsmelding,
	onFerdig: () => void
	varighet: number | null,
	className?: string
}

export const StartdatoEndringsmeldingPanel = ({ endringsmelding, varighet, onFerdig, className }: IProps): React.ReactElement => {
	const startdato = endringsmelding.innhold.oppstartsdato
	return (
		<EndringsmeldingPanel endringsmelding={endringsmelding} onFerdig={onFerdig} className={className}>
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
		</EndringsmeldingPanel>
	)
}
