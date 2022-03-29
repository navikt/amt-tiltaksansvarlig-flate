import React from 'react'
import { Header as InternHeader } from '@navikt/ds-react-internal'
import { usePromise } from '../utils/use-promise'
import { fetchInnloggetAnsatt } from '../api/api'
import { lagBrukerNavn } from '../utils/bruker-utils'

export const Header = (): React.ReactElement => {
	const innloggetAnsattPromise = usePromise(() => fetchInnloggetAnsatt())

	const maybeData = innloggetAnsattPromise.result?.data

	const innloggetAnsattNavn = maybeData
		? lagBrukerNavn(maybeData.fornavn, maybeData.mellomnavn, maybeData.etternavn)
		: ''

	return (
		<InternHeader className="w-full">
			<InternHeader.Title as="h1">NAV Tiltaksansvarlig</InternHeader.Title>
			<InternHeader.User
				name={innloggetAnsattNavn}
				style={{ marginLeft: 'auto' }}
			/>
		</InternHeader>
	)
}