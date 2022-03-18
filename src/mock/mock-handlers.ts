import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

export const mockHandlers: RequestHandler[] = [
	rest.get('/app/is-authenticated', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	})
]
