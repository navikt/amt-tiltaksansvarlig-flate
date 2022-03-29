import React from 'react'
import { BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react'
import styles from './DeltakerPanel.module.scss'

interface PanelLinjeProps {
	children: React.ReactNode
}

const PanelLinje = ({ children } : PanelLinjeProps): React.ReactElement => {
	return <div className={styles.linjeWrapper}>
		{children}
	</div>
}

export const DeltakerPanel = (): React.ReactElement => {
	return(
		<Panel className={styles.panel}>
			<PanelLinje>
				<Heading size="small">Mygg, Luresen</Heading>
				<BodyShort className={styles.fnr}>012345</BodyShort>
				<Detail size="small" className={styles.moveRight}>Sendt: 19.01.2022</Detail>
			</PanelLinje>
			<PanelLinje>
				<BodyShort>Ny oppstartsdato: 23.05.2022</BodyShort>
				<Button size="small" className={styles.moveRight}>Aktiver</Button>
			</PanelLinje>
		</Panel>
	)
}