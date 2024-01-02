import { AxiosPromise, AxiosResponse } from 'axios'
import { z } from 'zod'

import { appUrl } from '../utils/url-utils'
import { MeldingerFraArrangor, MeldingerFraArrangorSchema } from './schema/meldinger'
import {
	ArrangorSchema,
	GjennomforingDetaljerSchema,
	GjennomforingerSchema,
	GjennomforingSchema,
	HentGjennomforingerMedLopenrSchema,
	HentGjennomforingMedLopenrSchema,
	InnloggetNavAnsattSchema,
	TiltakSchema
} from './schema/schema'
import { axiosInstance } from './utils'

export type InnloggetNavAnsatt = z.infer<typeof InnloggetNavAnsattSchema>

export type Gjennomforing = z.infer<typeof GjennomforingSchema>

export type GjennomforingDetaljer = z.infer<typeof GjennomforingDetaljerSchema>

export type Arrangor = z.infer<typeof ArrangorSchema>

export type HentGjennomforingMedLopenr = z.infer<typeof HentGjennomforingMedLopenrSchema>

export type Tiltak = z.infer<typeof TiltakSchema>

const parseSchema = <T>(res: AxiosResponse, schema: z.ZodSchema<T>) => ({ ...res, data: schema.parse(res.data) })

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error
}

export const fetchInnloggetAnsatt = (): Promise<InnloggetNavAnsatt> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return fetch(endepunkt, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
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
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
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
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		}
	})
		.then(response => {
			if (response.status !== 200) {
				exposeError(new Error(`Kunne ikke hente gjennomføring med id ${id}. Status: ${response.status}`), endepunkt)
			}
			return response.json()
		})
		.then(json => GjennomforingDetaljerSchema.parse(json))
}

export const fetchMmeldingerFraArrangor = (gjennomforingId: string): AxiosPromise<MeldingerFraArrangor> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/meldinger?gjennomforingId=${gjennomforingId}`)
	return axiosInstance
		.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, MeldingerFraArrangorSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const markerEndringsmeldingSomFerdig = (endringsmeldingId: string): AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding/${endringsmeldingId}/ferdig`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const leggTilTilgangTilGjennomforing = (gjennomforingId: string): AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.post(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fjernGjennomforingFraOversikten = (gjennomforingId: string): AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing-tilgang/stop?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const hentGjennomforingMedLopenr = (lopenr: number): AxiosPromise<HentGjennomforingMedLopenr[]> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing?lopenr=${lopenr}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, HentGjennomforingerMedLopenrSchema))
		.catch((error) => exposeError(error, endepunkt))
}
