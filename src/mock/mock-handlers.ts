import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

export const mockHandlers: RequestHandler[] = [
	rest.get('/app/is-authenticated', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	}),
	rest.get('/gjennomforinger', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(
			[
				{ navn: 'Oppfølging Tjenesteområde 1', id: '9432095834095' },
				{ navn: 'Oppfølging Tjenesteområde 2', id: '9432095834098' }
			]
		))
	})
]
