import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'
import {
	fjernTilgang,
	fjernUbesluttedForesporsel,
	fjernUbruktInvitasjon,
	gjennomforinger,
	godkjennForesporsel,
	hentTilganger,
	hentUbesluttedeForesporsler,
	hentUbrukteInvitasjoner,
	innloggetAnsatt,
	opprettInvitasjon
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

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang'), (req, res, ctx) => {
		const gjennomforingId = req.url.searchParams.get('gjennomforingId') as string

		return res(ctx.delay(250), ctx.json(hentTilganger(gjennomforingId)))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/:tilgangId/stop'), (req, res, ctx) => {
		const tilgangId = req.params['tilgangId'] as string

		fjernTilgang(tilgangId)

		return res(ctx.delay(250), ctx.status(200))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon/ubrukt'), (req, res, ctx) => {
		const gjennomforingId = req.url.searchParams.get('gjennomforingId') as string

		return res(ctx.delay(250), ctx.json(hentUbrukteInvitasjoner(gjennomforingId)))
	}),
	rest.post(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon'), (req, res, ctx) => {
		const body = req.body as { gjennomforingId: string }

		opprettInvitasjon(body.gjennomforingId)

		return res(ctx.delay(250), ctx.status(201))
	}),
	rest.delete(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon/:invitasjonId'), (req, res, ctx) => {
		const invitasjonId = req.params['invitasjonId'] as string

		fjernUbruktInvitasjon(invitasjonId)

		return res(ctx.delay(250), ctx.status(200))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/ubesluttet'), (req, res, ctx) => {
		const gjennomforingId = req.url.searchParams.get('gjennomforingId') as string

		return res(ctx.delay(250), ctx.json(hentUbesluttedeForesporsler(gjennomforingId)))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/:foresporselId/godkjenn'), (req, res, ctx) => {
		const foresporselId = req.params['foresporselId'] as string

		godkjennForesporsel(foresporselId)

		return res(ctx.delay(250), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/:foresporselId/avvis'), (req, res, ctx) => {
		const foresporselId = req.params['foresporselId'] as string

		fjernUbesluttedForesporsel(foresporselId)

		return res(ctx.delay(250), ctx.status(200))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/endringsmelding'), (req, res, ctx) => {
		return res(ctx.delay(250), ctx.json(endringsmeldingData))
	}),
	rest.post(appUrl('/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang/stop'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
]
