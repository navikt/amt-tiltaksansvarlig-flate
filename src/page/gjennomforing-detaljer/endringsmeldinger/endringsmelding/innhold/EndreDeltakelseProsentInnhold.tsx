import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { formatDate } from '../../../../../utils/date-utils'
import { Nullable } from '../../../../../utils/types'
import styles from '../Endringsmelding.module.scss'

interface Props {
    deltakelseProsent: number,
	gyldigFraDato: Nullable<Date>
}

export const EndreDeltakelseProsentInnhold = ({ deltakelseProsent, gyldigFraDato }: Props): React.ReactElement => {
	return (
		<div>
			<BodyShort size="small" className={styles.endringInfoTekst}>
			Ny deltakelsesprosent: {deltakelseProsent}%
			</BodyShort>
			{ gyldigFraDato && <BodyShort size="small" className={styles.endringInfoTekst}>
			Gjelder fra {formatDate(gyldigFraDato)}
			</BodyShort> }
		</div>
	)
}
