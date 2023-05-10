import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { formatDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types'
import styles from '../Endringsmelding.module.scss'

interface Props {
    deltakelseProsent: number,
	dagerPerUke: Nullable<number>,
	gyldigFraDato: Nullable<Date>
}

export const EndreDeltakelseProsentInnhold = ({ deltakelseProsent, dagerPerUke, gyldigFraDato }: Props): React.ReactElement => {
	return (
		<div>
			<BodyShort size="small" className={styles.endringInfoTekst}>
			Ny deltakelsesprosent: {deltakelseProsent}%
			</BodyShort>
			{ skalViseDagerPerUke(dagerPerUke, deltakelseProsent) && dagerPerUke === 1 && <BodyShort size="small" className={styles.endringInfoTekst}>
				{dagerPerUke} dag i uka
			</BodyShort> }
			{ skalViseDagerPerUke(dagerPerUke, deltakelseProsent) && dagerPerUke !== 1 && <BodyShort size="small" className={styles.endringInfoTekst}>
				{dagerPerUke} dager i uka
			</BodyShort> }
			{ gyldigFraDato && <BodyShort size="small" className={styles.endringInfoTekst}>
			Gjelder fra {formatDate(gyldigFraDato)}
			</BodyShort> }
		</div>
	)
}

const skalViseDagerPerUke = (dagerPerUke: Nullable<number>, deltakelseProsent: number): boolean => {
	return deltakelseProsent < 100 && dagerPerUke !== null
}
