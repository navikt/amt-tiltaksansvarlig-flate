import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import { DeltakerStatusAarsak } from '../../../../../api/schema/endringsmelding'
import { PanelLinje } from '../PanelLinje'
import styles from '../Endringsmelding.module.scss'
import { formatDate } from '../../../../../utils/date-utils'


interface IProps {
	sluttdato?: Date
	aarsak?: DeltakerStatusAarsak
}

export const AvsluttingsInnhold = ({ sluttdato, aarsak }: IProps): React.ReactElement => {
	return (
		<div className={styles.moveTop}>
			{aarsak &&
				<PanelLinje>
					<BodyShort size="small" className={styles.endringInfoTekst}>Årsak: {formatStatusAarsak(aarsak)}</BodyShort>
				</PanelLinje>
			}
			{sluttdato &&
				<PanelLinje>
					<BodyShort size="small" className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(sluttdato)}</BodyShort>
				</PanelLinje>
			}
		</div>
	)
}

const formatStatusAarsak = (aarsak: DeltakerStatusAarsak): string => {
	switch (aarsak) {
		case DeltakerStatusAarsak.SYK: return 'Syk'
		case DeltakerStatusAarsak.FATT_JOBB: return 'Fatt jobb'
		case DeltakerStatusAarsak.TRENGER_ANNEN_STOTTE: return 'Trenger annen stotte'
		case DeltakerStatusAarsak.FIKK_IKKE_PLASS: return 'Fikk ikke plass'
		case DeltakerStatusAarsak.UTDANNING: return 'Utdanning'
		case DeltakerStatusAarsak.FERDIG: return 'Ferdig'
		case DeltakerStatusAarsak.AVLYST_KONTRAKT: return 'Avlyst kontrakt'
		case DeltakerStatusAarsak.IKKE_MOTT: return 'Ikke mott'
		case DeltakerStatusAarsak.FEILREGISTRERT: return 'Feilregistrert'
		case DeltakerStatusAarsak.ANNET: return 'Annet'
	}
}
