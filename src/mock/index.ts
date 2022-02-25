import { setupWorker } from 'msw'

import { appUrl } from '../utils/url-utils'
import { mockHandlers } from './handlers/mock-handlers'

setupWorker(...mockHandlers)
	.start({ serviceWorker: { url: appUrl('mockServiceWorker.js') } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
