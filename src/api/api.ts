import { z } from 'zod'

import { APP_NAME } from '../constants'
import { appUrl } from '../utils/url-utils'
import { MeldingerFraArrangor, MeldingerFraArrangorSchema } from './schema/meldinger'
import {
	GjennomforingDetaljerSchema,
	GjennomforingerSchema,
	GjennomforingSchema,
	HentGjennomforingerMedLopenrSchema,
	HentGjennomforingMedLopenrSchema,
	InnloggetNavAnsattSchema,
	TiltakSchema
} from './schema/schema'

export type InnloggetNavAnsatt = z.infer<typeof InnloggetNavAnsattSchema>

export type Gjennomforing = z.infer<typeof GjennomforingSchema>

export type GjennomforingDetaljer = z.infer<typeof GjennomforingDetaljerSchema>

export type HentGjennomforingMedLopenr = z.infer<typeof HentGjennomforingMedLopenrSchema>

export type Tiltak = z.infer<typeof TiltakSchema>

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error
}

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'Nav-Consumer-Id': APP_NAME
}

export const fetchInnloggetAnsatt = (): Promise<InnloggetNavAnsatt> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente login. Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => InnloggetNavAnsattSchema.parse(json))
}
export const fetchGjennomforinger = (): Promise<Gjennomforing[]> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente gjennomføringer. Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => GjennomforingerSchema.parse(json))
}

export const fetchGjennomforing = (id: string): Promise<GjennomforingDetaljer> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente gjennomføring med id ${id}. Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => GjennomforingDetaljerSchema.parse(json))
}

export const fetchMeldingerFraArrangor = (gjennomforingId: string): Promise<MeldingerFraArrangor> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/meldinger?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente meldinger for gjennomføring med id ${gjennomforingId}. Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => MeldingerFraArrangorSchema.parse(json))
}

export const markerEndringsmeldingSomFerdig = (endringsmeldingId: string): Promise<Response> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding/${endringsmeldingId}/ferdig`)
	return fetch(endepunkt, {
		method: 'PATCH',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke sette endringsmeling med id ${endringsmeldingId} som ferdig. Status: ${response.status}`), endepunkt)
			}

			return response
		})

}

export const leggTilTilgangTilGjennomforing = (gjennomforingId: string): Promise<Response> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'POST',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke gi tilgang til ${gjennomforingId} . Status: ${response.status}`), endepunkt)
			}

			return response
		})
}

export const fjernGjennomforingFraOversikten = (gjennomforingId: string): Promise<Response> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang/stop?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'PATCH',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke fjerne tilgang til ${gjennomforingId} . Status: ${response.status}`), endepunkt)
			}

			return response
		})
}

export const hentGjennomforingMedLopenr = (lopenr: number): Promise<HentGjennomforingMedLopenr[]> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing?lopenr=${lopenr}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente gjennomføring med løpenummer ${lopenr} . Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => HentGjennomforingerMedLopenrSchema.parse(json))
}
