import React, { useState } from 'react'
import { Header as InternHeader } from '@navikt/ds-react-internal'
import { Link, Panel } from '@navikt/ds-react'
import { appUrl } from '../../utils/url-utils'
import styles from './Header.module.scss'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { useDataStore } from '../../store/data-store'

export const Header = (): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()
	const [ showDropdown, setShowDropdown ] = useState(false)

	return (
		<InternHeader className={styles.header} data-testid="innlogget-header">
			<InternHeader.Title href={FORSIDE_PAGE_ROUTE} aria-label="lenke til startsiden">NAV
				Arbeidsmarkedstiltak</InternHeader.Title>
			<InternHeader.UserButton
				name={innloggetAnsatt.navn}
				className={styles.userBtn}
				onClick={() => setShowDropdown(show => !show)}
			/>
			{showDropdown && (
				<Panel className={styles.userDropdown} border onBlur={() => setShowDropdown(false)}>
					<Link className={styles.logOutLink} href={appUrl('/oauth2/logout')}>Logg ut</Link>
				</Panel>
			)}
		</InternHeader>
	)
}
