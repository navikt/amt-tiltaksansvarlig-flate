import 'dayjs/locale/nb'
import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import env from './utils/environment'
import '@navikt/ds-css'
import '@navikt/ds-css-internal'


(async () => {
	dayjs.locale('nb')

	if (env.isMockEnabled) {
		await import('./mock')
	}

	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	)
})()
