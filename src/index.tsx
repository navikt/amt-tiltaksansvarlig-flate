import 'dayjs/locale/nb'
import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { enableMocking } from './mock/setupMocks'


(async() => {
	dayjs.locale('nb')
	

	// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
	enableMocking().then(() => {
		const container = document.getElementById('root')
		const root = createRoot(container!)

		root.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>,
		)
	})
})()
