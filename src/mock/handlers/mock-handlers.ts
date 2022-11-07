import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../../utils/url-utils'
import {
	gjennomforinger,
	innloggetAnsatt
} from '../data'
import { endringsmeldingData } from '../endringsmelding-data'
import { GjennomforingDetaljer, Gjennomforing, HentGjennomforingMedLopenr } from '../../api/api'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg'), (req, res, ctx) => {
		return res(ctx.delay(250), ctx.json(innloggetAnsatt))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing'), (req, res, ctx) => {
		const lopenr = req.url.searchParams.get('lopenr')

		if (lopenr) {
			let gjennomforinger: HentGjennomforingMedLopenr[] = []

			if (lopenr === '0') {
				gjennomforinger = []
			} else {
				gjennomforinger = [
					{
						id: '87d67559-7571-42e4-812a-1905217fdae2',
						navn: 'TEST',
						lopenr: 123,
						opprettetAr: 2020,
						arrangorNavn: 'Muligheter As',
						tiltak: {
							kode: 'ARBFORB',
							navn: 'Arbeidsforberedende trening (AFT)',
						}
					},
					{
						id: '6ec95b2a-be19-41f0-9c97-1f81ab2159c3',
						navn: 'Oppfølging Tjenesteområde 1',
						lopenr: 123,
						opprettetAr: 2020,
						arrangorNavn: 'Muligheter As',
						tiltak: {
							kode: 'INDOPPFAG',
							navn: 'Oppfølging',
						}
					}
				]

			}

			return res(ctx.delay(250), ctx.json(gjennomforinger))
		}

		const data: Gjennomforing[] = gjennomforinger
			.map(g => ({
				id: g.id,
				navn: g.navn,
				arrangorNavn: g.arrangor.virksomhetNavn,
				lopenr: g.lopenr,
				opprettetAar: g.opprettetAr,
				antallAktiveEndringsmeldinger: g.antallAktiveEndringsmeldinger,
				tiltak: g.tiltak,
			}))

		return res(ctx.delay(250), ctx.json(data))
	}),
	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing/:id'), (req, res, ctx) => {
		const id = req.params['id']
		const gjennomforing: GjennomforingDetaljer | undefined = gjennomforinger.find(g => g.id === id)
		if (!gjennomforing) {
			return res(ctx.delay(250), ctx.status(404))
		}
		return res(ctx.delay(250), ctx.json(gjennomforing))
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
