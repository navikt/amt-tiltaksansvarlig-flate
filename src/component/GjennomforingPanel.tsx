import { Heading } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { Gjennomforing } from '../api/api'
import { appUrl } from '../utils/url-utils'
import { SpaLenkepanel } from './spa-lenkepanel/SpaLenkepanel'

interface GjennomforingPanelProps {
	gjennomforing : Gjennomforing
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<SpaLenkepanel to={appUrl(`/gjennomforing/${gjennomforing.id}`)} className={styles.panel}>
			<Heading size="xsmall">
				{gjennomforing.navn}
			</Heading>
		</SpaLenkepanel>
	)
}