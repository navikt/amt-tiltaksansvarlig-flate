import { Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IsAuthenticated, fetchIsAuthenticated } from './api/api'
import { Header } from './component/Header'
import { FORSIDE_PAGE_ROUTE, GJENNOMFORING_PAGE_ROUTE } from './navigation'
import { Forside } from './page/Forside'
import { GjennomforingDetaljerPage } from './page/GjennomforingDetaljerPage'
import { LoginPage } from './page/LoginPage'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticated>>(fetchIsAuthenticated)

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
				<Route path={FORSIDE_PAGE_ROUTE} element={<Forside/>}/>
				<Route path={`${GJENNOMFORING_PAGE_ROUTE}/:gjennomforingId`} element={<GjennomforingDetaljerPage />}/>
			</Routes>
		</BrowserRouter>
	)
}
