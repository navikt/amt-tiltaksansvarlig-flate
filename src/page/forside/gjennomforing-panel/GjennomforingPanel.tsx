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

			<div className={styles.info}>
				<BodyShort className={styles.muted}>
					{gjennomforing.arrangorNavn}
				</BodyShort>

				<BodyShort className={styles.muted}>
					{gjennomforing.opprettetAar}/{gjennomforing.lopenr}
				</BodyShort>
			</div>
		</SpaLenkepanel>
	)
}