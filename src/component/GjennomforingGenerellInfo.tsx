import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from './GjennomforingGenerellInfo.module.scss'
import { Gjennomforing } from '../api/api'
import dayjs from 'dayjs'

interface GjennomforingGenerellInfoProps {
	gjennomforing: Gjennomforing
}

const getDatoMedMndNavn = (dato: Date) => dayjs(dato).format('D. MMMM YYYY')

export const GjennomforingGenerellInfo = ({ gjennomforing }: GjennomforingGenerellInfoProps): React.ReactElement => {
	const oppstart = getDatoMedMndNavn(gjennomforing.startDato)
	const sluttdato = getDatoMedMndNavn(gjennomforing.sluttDato)

	return <div className={styles.section}>
		<BodyShort spacing size="small">Organisasjon: {gjennomforing.arrangor.organisasjonNavn?? gjennomforing.arrangor.virksomhetNavn}</BodyShort>
		<BodyShort spacing size="small">Oppstart: {oppstart}</BodyShort>
		<BodyShort spacing size="small">Sluttdato: {sluttdato}</BodyShort>
	</div>
}