import { Heading } from '@navikt/ds-react'
import React from 'react'

import styles from './Header.module.scss'

export const Header = (): React.ReactElement => {
	return (
		<header className={styles.header}>

			<div className={styles.logoAndTitleSection}>
				<Heading size="medium" level="1">Tiltaksansvarlig flate</Heading>
			</div>

		</header>
	)
}