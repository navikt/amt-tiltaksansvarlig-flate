import { Tag, BodyShort, Heading } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingPanel.module.scss'
import { GjennomforingType } from '../../../../api/api'
import { gjennomforingDetaljerPageUrl } from '../../../../navigation'
import { SpaLenkepanel } from '../../../../component/spa-lenkepanel/SpaLenkepanel'

interface GjennomforingPanelProps {
	gjennomforing : GjennomforingType
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps) : React.ReactElement => {
	const harAktiveEndringsmeldinger = gjennomforing.antallAktiveEndringsmeldinger > 0

	return (
		<SpaLenkepanel to={gjennomforingDetaljerPageUrl(gjennomforing.id)} className={styles.panel}>
			<div className={styles.panelInnhold}>
				<div>
					<Heading size="xsmall" as="span" className={styles.header}>
						{gjennomforing.navn}
					</Heading>

					<div className={styles.info}>
						<BodyShort size="small">
							{gjennomforing.arrangorNavn}
						</BodyShort>

						<BodyShort size="small">
							{gjennomforing.opprettetAar}/{gjennomforing.lopenr}
						</BodyShort>
					</div>
				</div>

				{
					harAktiveEndringsmeldinger &&
						<Tag variant="info" size="small" className={styles.antallEndringsmeldingerEtikett}>
							Ny melding: {gjennomforing.antallAktiveEndringsmeldinger}
						</Tag>
				}
			</div>
		</SpaLenkepanel>
	)
}
