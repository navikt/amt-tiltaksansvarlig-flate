import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { Ansatt } from '../../api/data/ansatt'
import { PersonInfo } from '../../api/data/person-info'
import { appUrl } from '../../utils/url-utils'

export const mockHandlers: RequestHandler[] = [
	rest.get('/app/is-authenticated', (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	}),
	rest.get(appUrl('/app/person'), (req, res, ctx) => {
		const person: PersonInfo = {
			fornavn: 'Ola',
			etternavn: 'Nordmann'
		}

		return res(ctx.delay(500), ctx.json(person))
	}),
	rest.get(appUrl('/app/ansatt'), (req, res, ctx) => {
		const ansatt: Ansatt = {
			id: 'a375a539-98e8-49ca-91f2-3e149c4492b0',
			fornavn: 'Test',
			etternavn: 'Testersen',
			opprettetDato: new Date().toISOString(),
			opprettetAvNavIdent: 'Z12345'
		}

		return res(ctx.delay(500), ctx.json([ansatt]))
	}),
]
