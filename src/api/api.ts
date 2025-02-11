import { z } from 'zod'

import { APP_NAME } from '../constants'
import { apiUrl } from '../utils/url-utils'
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

const defaultHeaders = {
	'Content-Type': 'application/json',
	'Accept': 'application/json',
	'Nav-Consumer-Id': APP_NAME
}

export interface ApiResponse<T> {
	data: T | null,
	statusCode: number,
	errorMessage?: string
}

const asGenericApiResponse = (response: Response, errorMessage?: string) => {
	return {
		data: null,
		statusCode: response.status,
		errorMessage: errorMessage
	}
}

const handleResponse = async<T>(response: Response, parser: (arg0: JSON) => T, error?: string) : Promise<ApiResponse<T>> => {
	if(response.status !== 200) return asGenericApiResponse(response, error)

	const json = await response.json()
	const data = response.status == 200 ? parser(json): null
	return {
		data: data,
		statusCode: response.status
	}
}

export const fetchInnloggetAnsatt = (): Promise<ApiResponse<InnloggetNavAnsatt>> => {
	const endepunkt = apiUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => handleResponse(response, InnloggetNavAnsattSchema.parse, 'Kunne ikke hente login.'))
}

export const fetchGjennomforinger = (): Promise<ApiResponse<Gjennomforing[]>> => {
	const endepunkt = apiUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => handleResponse(response, GjennomforingerSchema.parse, 'Kunne ikke hente gjennomføringer'))
}

export const fetchGjennomforing = (id: string): Promise<ApiResponse<GjennomforingDetaljer>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => handleResponse(response, GjennomforingDetaljerSchema.parse, `Kunne ikke hente gjennomføring med id ${id}.`))
}

export const fetchMeldingerFraArrangor = (gjennomforingId: string): Promise<ApiResponse<MeldingerFraArrangor>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/meldinger?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => handleResponse(response, MeldingerFraArrangorSchema.parse, `Kunne ikke hente meldinger for gjennomføring med id ${gjennomforingId}`))
}

export const markerEndringsmeldingSomFerdig = (endringsmeldingId: string): Promise<ApiResponse<Response>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding/${endringsmeldingId}/ferdig`)
	return fetch(endepunkt, {
		method: 'PATCH',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => asGenericApiResponse(response, `Kunne ikke sette endringsmeling med id ${endringsmeldingId} som ferdig`))
}

export const leggTilTilgangTilGjennomforing = (gjennomforingId: string): Promise<ApiResponse<Response>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'POST',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => asGenericApiResponse(response, `Kunne ikke gi tilgang til ${gjennomforingId}.`))

}

export const fjernGjennomforingFraOversikten = (gjennomforingId: string): Promise<ApiResponse<Response>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang/stop?gjennomforingId=${gjennomforingId}`)

	return fetch(endepunkt, {
		method: 'PATCH',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => asGenericApiResponse(response, `Kunne ikke fjerne tilgang til ${gjennomforingId} .`))
}

export const hentGjennomforingMedLopenr = (lopenr: number): Promise<ApiResponse<HentGjennomforingMedLopenr[]>> => {
	const endepunkt = apiUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing?lopenr=${lopenr}`)

	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: defaultHeaders
	}).then(response => handleResponse(response, HentGjennomforingerMedLopenrSchema.parse, `Kunne ikke hente gjennomføring med løpenummer ${lopenr}.`))
}
