import { Heading, LinkPanel } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { Gjennomforing } from '../api/api'

interface GjennomforingPanelProps {
	gjennomforing : Gjennomforing
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<LinkPanel href={`/gjennomforing/${gjennomforing.id}`} className={styles.panel}>
			<Heading size="xsmall">
				{gjennomforing.navn}
			</Heading>
		</LinkPanel>
	)
}