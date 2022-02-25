import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { IsAuthenticated, isAuthenticated } from './api/api'
import { Header } from './component/header/Header'
import { MAIN_PAGE_ROUTE } from './navigation'
import { LoginPage } from './page/login/LoginPage'
import { MainPage } from './page/main/MainPage'
import { isNotStartedOrPending, isRejected, usePromise } from './utils/use-promise'

export const App = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticated>>(isAuthenticated)

	if (isNotStartedOrPending(isAuthenticatedPromise)) {
		return <div>...</div>
	}

	if (isRejected(isAuthenticatedPromise) || !isAuthenticatedPromise?.result.data.isAuthenticated) {
		return <LoginPage />
	}

	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path={MAIN_PAGE_ROUTE} element={<MainPage/>}/>
			</Routes>
		</BrowserRouter>
	)
}
