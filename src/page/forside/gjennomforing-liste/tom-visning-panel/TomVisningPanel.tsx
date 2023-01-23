import { BodyLong, Panel } from '@navikt/ds-react'
import React from 'react'

import clipboardImg from './clipboard.svg'
import styles from './TomVisningPanel.module.scss'

export const TomVisningPanel = (): React.ReactElement => {
	return (
		<Panel className={styles.panel}>
			<img src={clipboardImg} alt="Illustrasjon av ordrebrett" />
			<BodyLong size="small" className={styles.tekst}>
				Her mottar du endringsmeldinger fra tiltaksarrangører. Legg til tiltakene du jobber med.
			</BodyLong>
		</Panel>
	)
}
