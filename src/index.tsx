import 'dayjs/locale/nb'
import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import env from './utils/environment'


(async () => {
	dayjs.locale('nb')

	if (env.isMockEnabled) {
		await import('./mock')
	}
	const container = document.getElementById('root')

	// eslint-disable-next-line  @typescript-eslint/no-non-null-assertion
	const root = createRoot(container!)

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	)
})()
