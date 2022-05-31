import React, { useState } from 'react'
import { Header as InternHeader } from '@navikt/ds-react-internal'
import { usePromise } from '../../utils/use-promise'
import { fetchInnloggetAnsatt } from '../../api/api'
import { Link, Panel } from '@navikt/ds-react'
import { appUrl } from '../../utils/url-utils'
import styles from './Header.module.scss'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'

export const Header = (): React.ReactElement => {
	const innloggetAnsattPromise = usePromise(() => fetchInnloggetAnsatt())

	const [ showDropdown, setShowDropdown ] = useState(false)

	const maybeData = innloggetAnsattPromise.result?.data

	const innloggetAnsattNavn = maybeData
		? maybeData.navn
		: ''

	return (
		<InternHeader className="w-full">
			<InternHeader.Title href={FORSIDE_PAGE_ROUTE}>NAV Arbeidsmarkedstiltak</InternHeader.Title>
			<InternHeader.UserButton
				name={innloggetAnsattNavn}
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