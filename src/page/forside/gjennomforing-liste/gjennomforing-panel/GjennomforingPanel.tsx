import { BodyShort, Heading, Tag } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from '../../../../api/api'
import { GjennomforingStatus } from '../../../../api/schema/schema'
import { AvsluttetMerkelapp } from '../../../../component/avsluttet-merkelapp/AvsluttetMerkelapp'
import { SpaLenkepanel } from '../../../../component/spa-lenkepanel/SpaLenkepanel'
import { WarningGroup } from '../../../../component/WarningGroup'
import { gjennomforingDetaljerPageUrl } from '../../../../navigation'
import { formatDateMedMndNavn } from '../../../../utils/date-utils'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforing: Gjennomforing
	onClick: () => void
}

export const GjennomforingPanel = ({ gjennomforing, onClick }: GjennomforingPanelProps): React.ReactElement => {
	const harAktiveEndringsmeldinger = gjennomforing.antallAktiveEndringsmeldinger > 0
	const harSkjermedeEndringsmeldinger = gjennomforing.harSkjermedeDeltakere
	const avsluttet = gjennomforing.status === GjennomforingStatus.AVSLUTTET
	const oppstart = formatDateMedMndNavn(gjennomforing.startDato)
	const sluttdato = formatDateMedMndNavn(gjennomforing.sluttDato)

	return (
		<SpaLenkepanel to={gjennomforingDetaljerPageUrl(gjennomforing.id)} onClick={onClick} className={styles.panel}>
			<div className={styles.panelInnhold}>
				<div className={styles.infoWrapper}>
					<Heading size="xsmall" as="span" className={styles.header}>
						{gjennomforing.navn}
					</Heading>

					<div className={styles.info}>
						<BodyShort size="small">{gjennomforing.arrangorNavn}</BodyShort>

						<BodyShort size="small">
							{gjennomforing.opprettetAar}/{gjennomforing.lopenr}
						</BodyShort>
					</div>
					<div className={styles.info}>
						<AvsluttetMerkelapp hidden={!avsluttet} />
						<BodyShort size="small">
							{oppstart} - {sluttdato}
						</BodyShort>
					</div>
				</div>
				<div className={styles.tags}>
					{harAktiveEndringsmeldinger && (
						<Tag variant="info" size="small" className={styles.antallEndringsmeldingerEtikett}>
							Ny melding: {gjennomforing.antallAktiveEndringsmeldinger}
						</Tag>
					)}
					<WarningGroup 
						erSkjermet={harSkjermedeEndringsmeldinger} 
						adressebeskyttelser={gjennomforing.adressebeskyttelser} 
						alignItemsRight={true}
					/>
				</div>
			</div>
		</SpaLenkepanel>
	)
}
