import { Heading } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { GjennomforingType } from '../api/api'
import { SpaLenkepanel } from './spa-lenkepanel/SpaLenkepanel'
import { gjennomforingDetaljerPageUrl } from '../navigation'

interface GjennomforingPanelProps {
	gjennomforing : GjennomforingType
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<SpaLenkepanel to={gjennomforingDetaljerPageUrl(gjennomforing.id)} className={styles.panel}>
			<Heading size="xsmall">
				{gjennomforing.navn}
			</Heading>
		</SpaLenkepanel>
	)
}