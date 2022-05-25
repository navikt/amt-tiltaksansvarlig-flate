import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'
import {
	gjennomforinger,
	innloggetAnsatt
} from './data'
import { endringsmeldingData } from './endringsmelding-data'
import { GjennomforingType, HentGjennomforingerMedLopenrType } from '../api/api'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/auth/info'), (req, res, ctx) => {
		return res(ctx.delay(250), ctx.json({
			loggedIn: true
		}))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg'), (req, res, ctx) => {
		return res(ctx.delay(250), ctx.json(innloggetAnsatt))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing'), (req, res, ctx) => {
		const erSokPaLopenr = !!req.url.searchParams.get('lopenr')

		if (erSokPaLopenr) {
			const data: HentGjennomforingerMedLopenrType = [
				{
					id: '87d67559-7571-42e4-812a-1905217fdae2',
					navn: 'TEST',
					lopenr: 123,
					opprettetAr: 2020,
					arrangorNavn: 'Muligheter As'
				}
			]
			return res(ctx.delay(250), ctx.json(data))
		}

		const data: GjennomforingType[] = gjennomforinger
			.map(g => ({
				id: g.id,
				navn: g.navn,
				arrangorNavn:
				g.arrangor.virksomhetNavn,
				lopenr: 123,
				opprettetAar: 2020
			}))

		return res(ctx.delay(250), ctx.json(data))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing/:id'), (req, res, ctx) => {
		const id = req.params['id']
		return res(ctx.delay(250), ctx.json(
			gjennomforinger.find(g => g.id === id)
		))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/endringsmelding'), (req, res, ctx) => {
		return res(ctx.delay(250), ctx.json(endringsmeldingData))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/endringsmelding/:endringsmeldingId/ferdig'), (req, res, ctx) => {
		const endringsmeldingId = req.params['endringsmeldingId'] as string

		const melding = endringsmeldingData.find(e => e.id === endringsmeldingId)

		if (melding) {
			melding.aktiv = false
			melding.godkjent = true
			melding.arkivert = true
		}

		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang/stop'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
]
