import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from '../Endringsmelding.module.scss'

interface Props {
    deltakelseProsent: number
}

export const EndreDeltakelseProsentInnhold = ({ deltakelseProsent }: Props): React.ReactElement => {
	return (
		<BodyShort size="small" className={styles.endringInfoTekst}>
			Ny deltakelsesprosent: {deltakelseProsent}%
		</BodyShort>
	)
}
