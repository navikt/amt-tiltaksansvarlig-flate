import React from 'react'
import { Heading } from '@navikt/ds-react'
import styles from './TilgangskontrollHeader.module.scss'

export const TilgangskontrollHeader = () => {
	return (
		<div className={styles.headerFlexBox}>
			<div className={styles.header}>
				<Heading size="small" level="2" >Koordinator hos tiltaksarrangør</Heading>
			</div>
		</div>
	)
}