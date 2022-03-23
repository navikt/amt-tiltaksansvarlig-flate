import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'
import { gjennomforinger } from './data'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/is-authenticated'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(gjennomforinger))
	}),

	rest.get(appUrl('/amt-tiltak/api/gjennomforing/:id'), (req, res, ctx) => {
		const id = req.params['id']
		return res(ctx.delay(500), ctx.json(
			gjennomforinger.find(g => g.id === id)
		))
	})
]
