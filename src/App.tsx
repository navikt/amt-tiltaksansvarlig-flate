import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { fetchIsAuthenticated, IsAuthenticated } from './api/api'
import { Header } from './component/Header'
import { FORSIDE_PAGE_ROUTE, GJENNOMFORING_DETALJER_PAGE_ROUTE, TILGANGSKONTROLL_PAGE_ROUTE } from './navigation'
import { Forside } from './page/Forside'
import { GjennomforingDetaljerPage } from './page/gjennomforing-detaljer/GjennomforingDetaljerPage'
import { LoginPage } from './page/LoginPage'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'
import { TilgangskontrollPage } from './page/tilgangskontroll/TilgangskontrollPage'
import { Spinner } from './component/spinner/Spinner'

export const App = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticated>>(fetchIsAuthenticated)

	if (isNotStartedOrPending(isAuthenticatedPromise)) {
		return <Spinner />
	}

	if (isRejected(isAuthenticatedPromise) || !isAuthenticatedPromise?.result.data.isAuthenticated) {
		return <LoginPage />
	}

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path={FORSIDE_PAGE_ROUTE} element={<Forside/>}/>
				<Route path={GJENNOMFORING_DETALJER_PAGE_ROUTE} element={<GjennomforingDetaljerPage />}/>
				<Route path={TILGANGSKONTROLL_PAGE_ROUTE} element={<TilgangskontrollPage />}/>
			</Routes>
		</BrowserRouter>
	)
}
