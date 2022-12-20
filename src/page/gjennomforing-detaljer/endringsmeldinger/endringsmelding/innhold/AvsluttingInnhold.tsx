import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { DeltakerStatusAarsak, DeltakerStatusAarsakType } from '../../../../../api/schema/endringsmelding'
import { formatDate } from '../../../../../utils/date-utils'
import styles from '../Endringsmelding.module.scss'


interface Props {
	sluttdato?: Date
	aarsak?: DeltakerStatusAarsak
}

export const AvsluttingInnhold = ({ sluttdato, aarsak }: Props): React.ReactElement => {
	return (
		<div>
			{aarsak &&
				<BodyShort size="small" className={styles.endringInfoTekst}>
					Årsak: {aarsak.beskrivelse ? aarsak.beskrivelse : formatStatusAarsakType(aarsak.type)}
				</BodyShort>
			}
			{sluttdato &&
				<BodyShort size="small" className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(sluttdato)}</BodyShort>
			}
		</div>
	)
}

const formatStatusAarsakType = (type: DeltakerStatusAarsakType): string => {
	switch (type) {
		case DeltakerStatusAarsakType.SYK: return 'Syk'
		case DeltakerStatusAarsakType.FATT_JOBB: return 'Fått jobb'
		case DeltakerStatusAarsakType.TRENGER_ANNEN_STOTTE: return 'Trenger annen hjelp og støtte'
		case DeltakerStatusAarsakType.UTDANNING: return 'Utdanning'
		case DeltakerStatusAarsakType.IKKE_MOTT: return 'Møter ikke opp'
		case DeltakerStatusAarsakType.ANNET: return 'Annet'
		default: return 'Ukjent'
	}
}
