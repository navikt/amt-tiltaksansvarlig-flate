import { z } from 'zod'
import { AxiosPromise, AxiosResponse } from 'axios'

import { appUrl } from '../utils/url-utils'
import { axiosInstance } from './utils'
import {
	AnsattTilgangerSchema,
	AnsattTilgangSchema,
	ArrangorSchema,
	DeltakereSchema,
	DeltakerSchema,
	GjennomforingerSchema,
	GjennomforingSchema
} from './schema'

export interface IsAuthenticated {
	isAuthenticated: boolean;
}

export type Gjennomforing = z.infer<typeof GjennomforingSchema>
export type Gjennomforinger = z.infer<typeof GjennomforingerSchema>
export type Arrangor = z.infer<typeof ArrangorSchema>
export type Deltaker = z.infer<typeof DeltakerSchema>
export type Deltakere = z.infer<typeof DeltakereSchema>
export type AnsattTilgang = z.infer<typeof AnsattTilgangSchema>
export type AnsattTilganger = z.infer<typeof AnsattTilgangerSchema>

const parseSchema = <T>(res: AxiosResponse, schema: z.ZodSchema<T>) => ({ ...res, data: schema.parse(res.data) })

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error

}

export const fetchIsAuthenticated = (): AxiosPromise<IsAuthenticated> => {
	return axiosInstance.get(appUrl('/amt-tiltak/api/is-authenticated'))
}

export const fetchGjennomforinger = () : AxiosPromise<Gjennomforinger> => {
	const endepunkt = appUrl('/amt-tiltak/api/gjennomforing')
	return axiosInstance.get(appUrl('/amt-tiltak/api/gjennomforing'))
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingerSchema))
		.catch((error) => exposeError(error, endepunkt))

}

export const fetchGjennomforing = (id: string) : AxiosPromise<Gjennomforing> => {
	const endepunkt = appUrl(`/amt-tiltak/api/gjennomforing/${id}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchDeltakere = (id: string) : AxiosPromise<Deltakere> => {
	const endepunkt = appUrl(`/amt-tiltak/api/gjennomforing/${id}/deltakere`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, DeltakereSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchAnsattTilganger = (gjennomforingId: string) : AxiosPromise<AnsattTilganger> => {
	const endepunkt = appUrl(`/amt-tiltak/api/tilgang/gjennomforing/${gjennomforingId}/ansatte`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, AnsattTilgangerSchema))
		.catch((error) => exposeError(error, endepunkt))
}