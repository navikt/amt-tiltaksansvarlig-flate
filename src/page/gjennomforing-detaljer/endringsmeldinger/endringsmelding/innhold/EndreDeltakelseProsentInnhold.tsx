import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from '../Endringsmelding.module.scss'
import { PanelLinje } from '../PanelLinje'

interface Props {
    deltakelseProsent: number
}

export const EndreDeltakelseProsentInnhold = ({ deltakelseProsent }: Props): React.ReactElement => {
	return (
		<div className={styles.moveTop}>
			<PanelLinje>
				<BodyShort size="small" className={styles.endringInfoTekst}>
                    Ny deltakelsesprosent: {deltakelseProsent}%
				</BodyShort>
			</PanelLinje>
		</div>
	)
}
