import { Panel } from '@navikt/ds-react'
import React from 'react'
import { Link } from 'react-router-dom'

import { TILGANGSKONTROLL_PAGE_ROUTE } from '../../navigation'
import styles from './MainPage.module.scss'

export const MainPage = (): React.ReactElement => {
	return (
		<main className={styles.mainPage}>
			<Panel>
				<Link to={TILGANGSKONTROLL_PAGE_ROUTE}>Tilgangskontroll</Link>
			</Panel>
		</main>
	)
}