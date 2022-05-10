import React from 'react'
import { Heading } from '@navikt/ds-react'
import { Link } from 'react-router-dom'
import { tilgangskontrollPageUrl } from '../../../navigation'
import styles from './TilgangskontrollHeader.module.scss'

interface  TilgangskontrollHeaderProps {
	gjennomforingId?: string
}

export const TilgangskontrollHeader = ({ gjennomforingId }: TilgangskontrollHeaderProps) => {
	return (
		<div className={styles.headerFlexBox}>
			<div className={styles.header}>
				<Heading size="small" level="2" >Koordinator hos tiltaksarrangør</Heading>
			</div>
			<Link to={tilgangskontrollPageUrl(gjennomforingId!)} className={styles.lenke}>
				Gå til tilgangskontroll
			</Link>
		</div>
	)
}