import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MainPage } from './component/page/main/MainPage'

export const App = (): React.ReactElement => {
	// if (isNotStartedOrPending(fetchInnloggetAnsattPromise)) {
	// 	return '...'
	// }
	//
	// if (isRejected(fetchInnloggetAnsattPromise)) {
	// 	return <LoginPage />
	// }

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
