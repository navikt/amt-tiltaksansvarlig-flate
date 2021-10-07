import { rest, setupWorker } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

const allHandlers: RequestHandler[] = [
	rest.get('/auth-proxy/is-authenticated', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	})
]

setupWorker(...allHandlers)
	.start({ serviceWorker: { url: process.env.PUBLIC_URL + '/mockServiceWorker.js' } })
	.catch((e) => {
		// eslint-disable-next-line no-console
		console.error('Unable to setup mocked API endpoints', e)
	})
