import { Heading, LinkPanel } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { Gjennomforing } from '../api/api'
import { appUrl } from '../utils/url-utils'

interface GjennomforingPanelProps {
	gjennomforing : Gjennomforing
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<LinkPanel href={appUrl(`/gjennomforing/${gjennomforing.id}`)} className={styles.panel}>
			<Heading size="xsmall">
				{gjennomforing.navn}
			</Heading>
		</LinkPanel>
	)
}