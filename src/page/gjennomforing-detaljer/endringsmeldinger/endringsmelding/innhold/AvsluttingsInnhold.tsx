import React from 'react'
import { BodyShort } from '@navikt/ds-react'
import { DeltakerStatusAarsak, DeltakerStatusAarsakType } from '../../../../../api/schema/endringsmelding'
import { PanelLinje } from '../PanelLinje'
import styles from '../Endringsmelding.module.scss'
import { formatDate } from '../../../../../utils/date-utils'


interface Props {
	sluttdato?: Date
	aarsak?: DeltakerStatusAarsak
}

export const AvsluttingsInnhold = ({ sluttdato, aarsak }: Props): React.ReactElement => {
	return (
		<div className={styles.moveTop}>
			{aarsak &&
				<PanelLinje>
					<BodyShort size="small" className={styles.endringInfoTekst}>
						Årsak: {aarsak.beskrivelse ? aarsak.beskrivelse : formatStatusAarsakType(aarsak.type)}
					</BodyShort>
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

const formatStatusAarsakType = (type: DeltakerStatusAarsakType): string => {
	switch (type) {
		case DeltakerStatusAarsakType.SYK: return 'Syk'
		case DeltakerStatusAarsakType.FATT_JOBB: return 'Fatt jobb'
		case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE: return 'Trenger annen stotte'
		case DeltakerStatusAarsakType.FIKK_IKKE_PLASS: return 'Fikk ikke plass'
		case DeltakerStatusAarsakType.UTDANNING: return 'Utdanning'
		case DeltakerStatusAarsakType.FERDIG: return 'Ferdig'
		case DeltakerStatusAarsakType.AVLYST_KONTRAKT: return 'Avlyst kontrakt'
		case DeltakerStatusAarsakType.IKKE_MOTT: return 'Ikke mott'
		case DeltakerStatusAarsakType.FEILREGISTRERT: return 'Feilregistrert'
		case DeltakerStatusAarsakType.ANNET: return 'Annet'
	}
}
