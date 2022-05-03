import { BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { GjennomforingType } from '../../../api/api'
import { gjennomforingDetaljerPageUrl } from '../../../navigation'
import { SpaLenkepanel } from '../../../component/spa-lenkepanel/SpaLenkepanel'

interface GjennomforingPanelProps {
	gjennomforing : GjennomforingType
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	return (
		<SpaLenkepanel to={gjennomforingDetaljerPageUrl(gjennomforing.id)} className={styles.panel}>
			<Heading size="xsmall" spacing>
				{gjennomforing.navn}
			</Heading>

			<BodyShort className={styles.grey}>
				{gjennomforing.arrangorNavn}
			</BodyShort>
		</SpaLenkepanel>
	)
}