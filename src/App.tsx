import { Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IsAuthenticated, isAuthenticated } from './api/api'
import { Header } from './component/header/Header'
import { MAIN_PAGE_ROUTE, TILGANGSKONTROLL_ARRANGOR_ANSATT_PAGE_ROUTE, TILGANGSKONTROLL_PAGE_ROUTE } from './navigation'
import { LoginPage } from './page/login/LoginPage'
import { MainPage } from './page/main/MainPage'
import { TilgangskontrollPage } from './page/tilgangskontroll/TilgangskontrollPage'
import { TilgangskontrollArrangorAnsattPage } from './page/tilgangskontroll-arrangor-ansatt/TilgangskontrollArrangorAnsattPage'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticated>>(isAuthenticated)

	if (isNotStartedOrPending(isAuthenticatedPromise)) {
		return <Loader size="2xlarge"/>
	}

	if (isRejected(isAuthenticatedPromise) || !isAuthenticatedPromise?.result.data.isAuthenticated) {
		return <LoginPage />
	}

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path={TILGANGSKONTROLL_PAGE_ROUTE} element={<TilgangskontrollPage/>}/>
				<Route path={TILGANGSKONTROLL_ARRANGOR_ANSATT_PAGE_ROUTE} element={<TilgangskontrollArrangorAnsattPage/>}/>
				<Route path={MAIN_PAGE_ROUTE} element={<MainPage/>}/>
			</Routes>
		</BrowserRouter>
	)
}
