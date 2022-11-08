import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingGenerellInfo.module.scss'
import { GjennomforingDetaljer } from '../api/api'
import { formatDateMedMndNavn } from '../utils/date-utils'

interface GjennomforingGenerellInfoProps {
	gjennomforing: GjennomforingDetaljer
	className?: string
}

export const GjennomforingGenerellInfo = ({ gjennomforing, className }: GjennomforingGenerellInfoProps): React.ReactElement => {
	const oppstart = formatDateMedMndNavn(gjennomforing.startDato)
	const sluttdato = formatDateMedMndNavn(gjennomforing.sluttDato)

	const arrangorNavn = gjennomforing.arrangor.organisasjonNavn ?? gjennomforing.arrangor.virksomhetNavn

	return (
		<div className={className}>
			<div className={styles.rad}>
				<BodyShort size="small" className={styles.sammendrag}>{arrangorNavn}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.tiltak.navn}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.opprettetAr}/{gjennomforing.lopenr}</BodyShort>
			</div>
			<BodyShort size="small">{oppstart} - {sluttdato}</BodyShort>
		</div>
	)
}
