import React from 'react'
import styles from '../Endringsmelding.module.scss'
import { PanelLinje } from '../PanelLinje'
import { BodyShort } from '@navikt/ds-react'

interface Props {
    deltakelseProsent: number
}

export const EndreDeltakelseProsentInnhold = ({ deltakelseProsent }: Props): React.ReactElement => {
	return (
		<div className={styles.moveTop}>
			<PanelLinje>
				<BodyShort size="small" className={styles.endringInfoTekst}>
                    Ny Deltakelsesprosent: {deltakelseProsent}%
				</BodyShort>
			</PanelLinje>
		</div>
	)
}
