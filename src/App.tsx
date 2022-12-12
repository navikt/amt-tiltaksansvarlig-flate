import { Alert } from '@navikt/ds-react'
import React from 'react'
import { BrowserRouter, Navigate,Route, Routes } from 'react-router-dom'

import { fetchInnloggetAnsatt } from './api/api'
import { Header } from './component/header/Header'
import { Spinner } from './component/spinner/Spinner'
import {
	FORSIDE_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE,
} from './navigation'
import { Forside } from './page/forside/Forside'
import { GjennomforingDetaljerPage } from './page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { LeggTilGjennomforingTilgangPage } from './page/legg-til-gjennomforing-tilgang/LeggTilGjennomforingTilgangPage'
import StoreProvider from './store/store-provider'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const innloggetAnsattPromise = usePromise(() => fetchInnloggetAnsatt())

	if (isNotStartedOrPending(innloggetAnsattPromise)) {
		return <Spinner />
	}

	if (isRejected(innloggetAnsattPromise)) {
		// This should not happen since autoLogin = true in nais.yaml
		return <Alert variant="warning">Du er ikke logget inn</Alert>
	}

	return (
		<StoreProvider innloggetAnsatt={innloggetAnsattPromise.result.data}>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path={FORSIDE_PAGE_ROUTE} element={<Forside/>}/>
					<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />}/>
					<Route path={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE} element={<LeggTilGjennomforingTilgangPage/>}/>
					<Route path="*" element={<Navigate replace to={FORSIDE_PAGE_ROUTE}/>}/>
				</Routes>
			</BrowserRouter>
		</StoreProvider>
	)
}
