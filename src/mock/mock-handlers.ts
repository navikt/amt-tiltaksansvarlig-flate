import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/is-authenticated'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforinger'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(
			[
				{ navn: 'Oppfølging Tjenesteområde 1', id: '9432095834095' },
				{ navn: 'Oppfølging Tjenesteområde 2', id: '9432095834098' }
			]
		))
	})
]
