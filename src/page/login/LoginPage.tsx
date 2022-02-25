import { Alert, Heading } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import globalStyles from '../../globals.module.scss'
import { appUrl } from '../../utils/url-utils'
import styles from './LoginPage.module.scss'

export const LoginPage = (): React.ReactElement => {
	const loginUrl = appUrl(`/oauth2/login?redirect=${window.location.href}`)

	return (
		<main className={styles.loginPage}>
			<Heading size="large" className={cls(globalStyles.blokkXl, styles.title)}>Hei!</Heading>

			<Alert variant="warning" className={globalStyles.blokkXl}>
				Dette er en demoløsning
			</Alert>

			<a className="knapp knapp--hoved" href={loginUrl}>Logg inn</a>
		</main>
	)
}