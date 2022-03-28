import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'
import { ansattInvitasjoner, ansattTilganger, gjennomforinger } from './data'

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
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(ansattTilganger))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/:tilgangId/stop'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(ansattInvitasjoner))
	}),
	rest.post(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(201))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/:invitasjonId/aksepter'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/:invitasjonId/avbryt'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	})
]


