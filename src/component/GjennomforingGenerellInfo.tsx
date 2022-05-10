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

	return (
		<div className={styles.section}>
			<BodyShort size="small" className={styles.sammendrag}>{gjennomforing.arrangor.organisasjonNavn?? gjennomforing.arrangor.virksomhetNavn}</BodyShort>
			<BodyShort size="small">{oppstart} - {sluttdato}</BodyShort>
		</div>
	)
}