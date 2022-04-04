import React, { useState } from 'react'
import { Header as InternHeader } from '@navikt/ds-react-internal'
import { usePromise } from '../../utils/use-promise'
import { fetchInnloggetAnsatt } from '../../api/api'
import { lagBrukerNavn } from '../../utils/bruker-utils'
import { Link, Panel } from '@navikt/ds-react'
import { appUrl } from '../../utils/url-utils'
import styles from './Header.module.scss'

export const Header = (): React.ReactElement => {
	const innloggetAnsattPromise = usePromise(() => fetchInnloggetAnsatt())

	const [ showDropdown, setShowDropdown ] = useState(false)

	const maybeData = innloggetAnsattPromise.result?.data

	const innloggetAnsattNavn = maybeData
		? lagBrukerNavn(maybeData.fornavn, maybeData.mellomnavn, maybeData.etternavn)
		: ''

	return (
		<InternHeader className="w-full">
			<InternHeader.Title as="h1">NAV Tiltaksansvarlig</InternHeader.Title>
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