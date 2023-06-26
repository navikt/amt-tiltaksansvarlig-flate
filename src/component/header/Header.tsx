import { InternalHeader, Link, Panel } from '@navikt/ds-react'
import React, { useState } from 'react'

import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { useDataStore } from '../../store/data-store'
import { appUrl } from '../../utils/url-utils'
import styles from './Header.module.scss'

export const Header = (): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()
	const [ showDropdown, setShowDropdown ] = useState(false)

	return (
		<InternalHeader className={styles.header} data-testid="innlogget-header">
			<InternalHeader.Title href={FORSIDE_PAGE_ROUTE} aria-label="lenke til startsiden">
				NAV Tiltaksadministrasjon
			</InternalHeader.Title>
			<InternalHeader.UserButton
				name={innloggetAnsatt.navn}
				className={styles.userBtn}
				onClick={() => setShowDropdown(show => !show)}
			/>
			{showDropdown && (
				<Panel className={styles.userDropdown} border onBlur={() => setShowDropdown(false)}>
					<Link className={styles.logOutLink} href={appUrl('/oauth2/logout')}>Logg ut</Link>
				</Panel>
			)}
		</InternalHeader>
	)
}
