import { Heading } from '@navikt/ds-react'
import React from 'react'

import globalStyles from '../../globals.module.scss'
import styles from './Header.module.scss'
import navLogo from './nav-logo.svg'

export const Header = (): React.ReactElement => {
	return (
		<header className={styles.header}>

			<div className={styles.logoAndTitleSection}>
				<img src={navLogo} className={globalStyles.blokkXs} alt="NAV logo"/>
				<Heading size="medium" level="1">Tiltaksansvarlig flate</Heading>
			</div>

		</header>
	)
}