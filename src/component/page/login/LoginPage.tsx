import cls from 'classnames'
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper'
import { Systemtittel } from 'nav-frontend-typografi'
import React from 'react'

import globalStyles from '../../../globals.module.less'
import styles from './LoginPage.module.less'

export const LoginPage = (): React.ReactElement => {
	const currentLocation = window.location.href
	const loginUrl = `/auth-proxy/oauth2/login?redirect_uri=${currentLocation}`

	return (
		<main className={styles.loginPage}>
			<Systemtittel className={cls(globalStyles.blokkXl, styles.title)}>Hei!</Systemtittel>

			<AlertStripeAdvarsel className={globalStyles.blokkXl}>
				Dette er en demoløsning
			</AlertStripeAdvarsel>

			<a className="knapp knapp--hoved" href={loginUrl}>Logg inn</a>
		</main>
	)
}