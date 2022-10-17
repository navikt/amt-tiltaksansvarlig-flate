import React from 'react'

import styles from './TomVisningPanel.module.scss'
import clipboardImg from './clipboard.svg'
import { BodyLong, Panel } from '@navikt/ds-react'

export const TomVisningPanel = (): React.ReactElement => {
	return (
		<Panel className={styles.panel}>
			<img src={clipboardImg} alt="Illustrasjon av ordrebrett" />
			<BodyLong size="small" className={styles.tekst}>
				Her kan du legge til tiltak som du jobber med. Løsningen er under utvikling og det jobbes kontinuerlig med å gjøre tjenesten bedre.
			</BodyLong>
		</Panel>
	)
}
