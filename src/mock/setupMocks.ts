import faker from 'faker'
import { delay, http, HttpResponse } from 'msw'
import { setupWorker } from 'msw/browser'

import { GjennomforingDetaljer, HentGjennomforingMedLopenr } from '../api/api'
import { EndringsmeldingStatus, EndringsmeldingType } from '../api/schema/meldinger'
import { GjennomforingStatus } from '../api/schema/schema'
import env from '../utils/environment'
import { gjennomforinger, innloggetAnsatt } from './data'
import { meldingeData } from './meldinger-data'

export async function enableMocking() {
	if (env.isMockEnabled) {
		return worker.start({
			serviceWorker: {
				url: '/mockServiceWorker.js'
			}
		})
	}
}

export const worker = setupWorker(
	http.get('/amt-tiltak/api/nav-ansatt/autentisering/meg', async() => {
		await delay(200)
		return HttpResponse.json(innloggetAnsatt)
	}),

	http.get('/amt-tiltak/api/nav-ansatt/gjennomforing', async({ request }) => {
		await delay(200)
		const url = new URL(request.url)
		const lopenr = url.searchParams.get('lopenr')

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
						status: GjennomforingStatus.AVSLUTTET,
						startDato: faker.date.past(10),
						sluttDato: faker.date.past(2),
						opprettetAr: 2020,
						arrangorNavn: 'Muligheter As',
						tiltak: {
							kode: 'ARBFORB',
							navn: 'Arbeidsforberedende trening (AFT)'
						}
					},
					{
						id: '6ec95b2a-be19-41f0-9c97-1f81ab2159c3',
						navn: 'Oppfølging Tjenesteområde 1',
						lopenr: 123,
						status: GjennomforingStatus.GJENNOMFORES,
						startDato: faker.date.past(2),
						sluttDato: faker.date.future(3),
						opprettetAr: 2020,
						arrangorNavn: 'Muligheter As',
						tiltak: {
							kode: 'INDOPPFAG',
							navn: 'Oppfølging'
						}
					}
				]
			}

			return HttpResponse.json(gjennomforinger)
		}

		return HttpResponse.json(gjennomforinger.map((g) => ({
			id: g.id,
			navn: g.navn,
			arrangorNavn: g.arrangor.virksomhetNavn,
			lopenr: g.lopenr,
			opprettetAar: g.opprettetAr,
			antallAktiveEndringsmeldinger: g.antallAktiveEndringsmeldinger,
			harSkjermedeDeltakere: g.harSkjermedeDeltakere,
			tiltak: g.tiltak,
			startDato: g.startDato,
			sluttDato: g.sluttDato,
			status: g.status
		})))

	}),

	http.get('/amt-tiltak/api/nav-ansatt/gjennomforing/:id', async({  params }) => {
		await delay(200)
		const { id } = params
		const gjennomforing: GjennomforingDetaljer | undefined = gjennomforinger.find((g) => g.id === id)

		if (!gjennomforing) {
			return new HttpResponse(null, { status: 404 })
		}

		return HttpResponse.json(gjennomforing)
	}),

	http.get('/amt-tiltak/api/nav-ansatt/meldinger', async({ request }) => {
		await delay(200)
		const url = new URL(request.url)
		const id = url.searchParams.get('gjennomforingId')
		const gjennomforing = gjennomforinger.find(g => g.id === id)

		if (gjennomforing?.tiltak.kode === 'GRUPPEAMO') {
			return HttpResponse.json({
				vurderinger: meldingeData.vurderinger,
				endringsmeldinger: meldingeData.endringsmeldinger.filter(e => e.type !== EndringsmeldingType.ENDRE_SLUTTAARSAK)
			})
		}

		return HttpResponse.json(meldingeData)
	}),

	http.patch('/amt-tiltak/api/nav-ansatt/endringsmelding/:endringsmeldingId/ferdig', async({ request }) => {
		await delay(200)
		const url = new URL(request.url)
		const endringsmeldingId = url.searchParams.get('endringsmeldingId')
		const melding = meldingeData.endringsmeldinger.find((e) => e.id === endringsmeldingId)
		if (melding) {
			melding.status = EndringsmeldingStatus.UTFORT
		}

		return new HttpResponse(null, { status: 200 })
	}),

	http.post('/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang', async() => {
		await delay(200)
		return new HttpResponse(null, { status: 200 })
	}),

	http.patch('/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang/stop', async() => {
		await delay(200)
		return new HttpResponse(null, { status: 200 })
	})
)
