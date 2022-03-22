import { Heading, LinkPanel } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from './Gjennomforinger'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforing : Gjennomforing
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<LinkPanel href={`/tiltak/${gjennomforing.id}`} className={styles.panel}>
			<Heading size="xsmall">
				{gjennomforing.navn}
			</Heading>
		</LinkPanel>
	)
}