import { BodyShort, LinkCard, Tag } from '@navikt/ds-react'
import React from 'react'

import { Gjennomforing } from '../../../../api/api'
import { GjennomforingStatus } from '../../../../api/schema/schema'
import { AvsluttetMerkelapp } from '../../../../component/avsluttet-merkelapp/AvsluttetMerkelapp'
import { WarningGroup } from '../../../../component/WarningGroup'
import { formatDateMedMndNavn } from '../../../../utils/date-utils'
import styles from './GjennomforingPanel.module.scss'
import { Link } from 'react-router-dom'
import { gjennomforingDetaljerPageUrl } from '../../../../navigation'

interface GjennomforingPanelProps {
	gjennomforing: Gjennomforing
}

export const GjennomforingPanel = ({
	gjennomforing
}: GjennomforingPanelProps): React.ReactElement => {
	const harAktiveEndringsmeldinger =
		gjennomforing.antallAktiveEndringsmeldinger > 0
	const harSkjermedeEndringsmeldinger = gjennomforing.harSkjermedeDeltakere
	const avsluttet = gjennomforing.status === GjennomforingStatus.AVSLUTTET
	const oppstart = formatDateMedMndNavn(gjennomforing.startDato)
	const sluttdato = formatDateMedMndNavn(gjennomforing.sluttDato)

	return (
		<>
			<LinkCard>
				<LinkCard.Title>
					<LinkCard.Anchor asChild>
						<Link
							to={gjennomforingDetaljerPageUrl(gjennomforing.id)}
						>
							{gjennomforing.navn}
						</Link>
					</LinkCard.Anchor>
				</LinkCard.Title>
				<LinkCard.Description>
					<div className={styles.info}>
						<BodyShort size="small">
							{gjennomforing.arrangorNavn}
						</BodyShort>

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
					{harAktiveEndringsmeldinger && (
						<div className={styles.nyMelding}>
							<Tag
								variant="info"
								size="small"
								className={
									styles.antallEndringsmeldingerEtikett
								}
							>
								Ny melding:{' '}
								{gjennomforing.antallAktiveEndringsmeldinger}
							</Tag>
						</div>
					)}
				</LinkCard.Description>
				<LinkCard.Footer>
					<WarningGroup
						erSkjermet={harSkjermedeEndringsmeldinger}
						adressebeskyttelser={gjennomforing.adressebeskyttelser}
					/>
				</LinkCard.Footer>
			</LinkCard>
		</>
	)
}
