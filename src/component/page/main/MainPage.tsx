import { AxiosResponse } from 'axios'
import React from 'react'

import { IsAuthenticated,isAuthenticated } from '../../../api/api'
import { isNotStartedOrPending, isRejected, usePromise } from '../../../utils/use-promise'
import { LoginPage } from '../login/LoginPage'

export const MainPage = (): React.ReactElement => {
	const isAuthenticatedPromise = usePromise<AxiosResponse<IsAuthenticated>>(isAuthenticated)

	if (isNotStartedOrPending(isAuthenticatedPromise)) {
		return <div>...</div>
	}

	if (isRejected(isAuthenticatedPromise) || !isAuthenticatedPromise?.result.data.isAuthenticated) {
		return <LoginPage />
	}

	return (
		<main>
			<h1>Du er logget inn</h1>
		</main>
	)
}