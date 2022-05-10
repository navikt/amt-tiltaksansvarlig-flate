import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingGenerellInfo.module.scss'
import { GjennomforingDetaljerType } from '../api/api'
import dayjs from 'dayjs'

interface GjennomforingGenerellInfoProps {
	gjennomforing: GjennomforingDetaljerType
	className?: string
}

const getDatoMedMndNavn = (dato: Date) => dayjs(dato).format('D. MMMM YYYY')

export const GjennomforingGenerellInfo = ({ gjennomforing, className }: GjennomforingGenerellInfoProps): React.ReactElement => {
	const oppstart = getDatoMedMndNavn(gjennomforing.startDato)
	const sluttdato = getDatoMedMndNavn(gjennomforing.sluttDato)

	const arrangorNavn = gjennomforing.arrangor.organisasjonNavn ?? gjennomforing.arrangor.virksomhetNavn

	return (
		<div className={styles.section}>
			<div className={styles.rad}>
				<BodyShort size="small" className={styles.sammendrag}>{arrangorNavn}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.tiltakNavn}</BodyShort>
				<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.opprettetAr}/{gjennomforing.lopenr}</BodyShort>
			</div>
			<BodyShort size="small">{oppstart} - {sluttdato}</BodyShort>
		</div>
	)
}