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

//PS bare midlertidig for demo
interface DeltakerPanelProps {
	navn: string
	fnr: string
	sendt: string
}

export const DeltakerPanel = ({ navn, fnr, sendt }: DeltakerPanelProps): React.ReactElement => {
	return(
		<Panel className={styles.panel}>
			<PanelLinje>
				<Heading size="small">{navn}</Heading>
				<BodyShort className={styles.fnr}>{fnr}</BodyShort>
				<Detail size="small" className={styles.moveRight}>Sendt: {sendt}</Detail>
			</PanelLinje>
			<PanelLinje>
				<BodyShort>Ny oppstartsdato: 23.05.2022</BodyShort>
				<Button size="small" className={styles.moveRight}>Ferdig</Button>
			</PanelLinje>
		</Panel>
	)
}