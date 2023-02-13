import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingDetaljer } from '../api/api'
import { GjennomforingStatus } from '../api/schema/schema'
import { formatDateMedMndNavn } from '../utils/date-utils'
import { AvsluttetMerkelapp } from './avsluttet-merkelapp/AvsluttetMerkelapp'
import styles from './GjennomforingGenerellInfo.module.scss'

interface GjennomforingGenerellInfoProps {
	gjennomforing: GjennomforingDetaljer
	className?: string
}

export const GjennomforingGenerellInfo = ({ gjennomforing, className }: GjennomforingGenerellInfoProps): React.ReactElement => {
	const oppstart = formatDateMedMndNavn(gjennomforing.startDato)
	const sluttdato = formatDateMedMndNavn(gjennomforing.sluttDato)
	const avsluttet = gjennomforing.status === GjennomforingStatus.AVSLUTTET

	const arrangor = gjennomforing.arrangor

	return (
		<div className={className}>
			<div className={styles.rad}>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.opprettetAr}/{gjennomforing.lopenr}</BodyShort>
				<AvsluttetMerkelapp hidden={!avsluttet} />
				<BodyShort size="small">{oppstart} - {sluttdato}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.tiltak.navn}</BodyShort>
			</div>
			<div className={styles.rad}>
				<BodyShort size="small" className={styles.sammendrag}>{arrangor.virksomhetNavn}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>Org.nr: {arrangor.virksomhetOrgnr}</BodyShort>
			</div>
		</div>
	)
}
