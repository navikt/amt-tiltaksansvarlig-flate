import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { fetchIsAuthenticated, IsAuthenticatedType } from './api/api'
import {
	FORSIDE_PAGE_ROUTE,
	GJENNOMFORING_DETALJER_PAGE_ROUTE,
	LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE,
} from './navigation'
import { Forside } from './page/forside/Forside'
import { GjennomforingDetaljerPage } from './page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'
import { Spinner } from './component/spinner/Spinner'
import { Header } from './component/header/Header'
import { LeggTilGjennomforingTilgangPage } from './page/legg-til-gjennomforing-tilgang/LeggTilGjennomforingTilgangPage'
import { Alert } from '@navikt/ds-react'

export const App = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticatedType>>(fetchIsAuthenticated)

	if (isNotStartedOrPending(isAuthenticatedPromise)) {
		return <Spinner />
	}

	if (isRejected(isAuthenticatedPromise) || !isAuthenticatedPromise?.result.data.loggedIn) {
		// This should not happen since autoLogin = true in nais.yaml
		return <Alert variant="warning">Du er ikke logget inn</Alert>
	}

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path={FORSIDE_PAGE_ROUTE} element={<Forside/>}/>
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />}/>
				<Route path={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE} element={<LeggTilGjennomforingTilgangPage/>}/>
			</Routes>
		</BrowserRouter>
	)
}
