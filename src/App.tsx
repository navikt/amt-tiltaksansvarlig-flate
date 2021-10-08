import { AxiosResponse } from 'axios'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { IsAuthenticated,isAuthenticated } from './api/api'
import { LoginPage } from './component/page/login/LoginPage'
import { MainPage } from './component/page/main/MainPage'
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
			<Switch>
				<Route path="/">
					<MainPage/>
				</Route>
			</Switch>
		</BrowserRouter>
	)
}
