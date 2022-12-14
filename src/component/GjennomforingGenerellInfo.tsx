import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { GjennomforingDetaljer } from '../api/api'
import { formatDateMedMndNavn } from '../utils/date-utils'
import styles from './GjennomforingGenerellInfo.module.scss'

interface GjennomforingGenerellInfoProps {
	gjennomforing: GjennomforingDetaljer
	className?: string
}

export const GjennomforingGenerellInfo = ({ gjennomforing, className }: GjennomforingGenerellInfoProps): React.ReactElement => {
	const oppstart = formatDateMedMndNavn(gjennomforing.startDato)
	const sluttdato = formatDateMedMndNavn(gjennomforing.sluttDato)

	const arrangor = gjennomforing.arrangor

	return (
		<div className={className}>
			<div className={styles.rad}>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.opprettetAr}/{gjennomforing.lopenr}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.tiltak.navn}</BodyShort>
				<BodyShort size="small">{oppstart} - {sluttdato}</BodyShort>
			</div>
			<BodyShort size="small" className={styles.sammendrag}>{arrangor.virksomhetNavn} Org.nr: {arrangor.virksomhetOrgnr}</BodyShort>
		</div>
	)
}
