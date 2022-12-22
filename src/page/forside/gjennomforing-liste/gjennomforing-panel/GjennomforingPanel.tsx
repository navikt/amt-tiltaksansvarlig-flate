import { BodyShort, Heading,Tag } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from '../../../../api/api'
import { SpaLenkepanel } from '../../../../component/spa-lenkepanel/SpaLenkepanel'
import { gjennomforingDetaljerPageUrl } from '../../../../navigation'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforing: Gjennomforing
}

export const GjennomforingPanel = ({ gjennomforing }: GjennomforingPanelProps): React.ReactElement => {
	const harAktiveEndringsmeldinger = gjennomforing.antallAktiveEndringsmeldinger > 0
	const harSkjermedeEndringsmeldinger = gjennomforing.harSkjermedeDeltakere

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
				<div className={styles.tags}>
					{
						harAktiveEndringsmeldinger &&
						<Tag variant="info" size="small" className={styles.antallEndringsmeldingerEtikett}>
							Ny melding: {gjennomforing.antallAktiveEndringsmeldinger}
						</Tag>
					}
					{
						harSkjermedeEndringsmeldinger &&
						<Tag variant="warning" size="small">
							Skjermet
						</Tag>
					}
				</div>
			</div>
		</SpaLenkepanel>
	)
}
