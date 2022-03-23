import './index.scss'

import dayjs from 'dayjs'
import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './App'
import env from './utils/environment'

require('dayjs/locale/nb')
dayjs.locale('nb')

if (env.isDevelopment) {
	require('./mock')
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
	document.getElementById('root')
)
