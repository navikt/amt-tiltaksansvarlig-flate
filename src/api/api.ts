import { AxiosPromise, AxiosResponse } from 'axios'
import { z } from 'zod'

import { appUrl } from '../utils/url-utils'
import { Endringsmelding, EndringsmeldingerSchema } from './schema/endringsmelding'
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

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetNavAnsatt> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, InnloggetNavAnsattSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforinger = (): AxiosPromise<Gjennomforing[]> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforing = (id: string): AxiosPromise<GjennomforingDetaljer> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingDetaljerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchEndringsmeldinger = (gjennomforingId: string): AxiosPromise<Endringsmelding[]> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, EndringsmeldingerSchema))
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
