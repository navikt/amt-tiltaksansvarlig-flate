import React from 'react'

import styles from './TomVisningPanel.module.scss'
import clipboardImg from './clipboard.svg'
import { BodyLong, Panel } from '@navikt/ds-react'

export const TomVisningPanel = (): React.ReactElement => {
	return (
		<Panel className={styles.panel}>
			<img src={clipboardImg} alt="Illustrasjon av ordrebrett"/>
			<BodyLong size="small" className={styles.tekst}>
				Her kan du legge til tiltak som du jobber med.
				Du vil ha tilgang til ulik funksjonalitet ut i fra
				hvilken rolle du har og hvilke arbeidsoppgaver du gjør rundt administrering av tiltak.
			</BodyLong>
		</Panel>
	)
}