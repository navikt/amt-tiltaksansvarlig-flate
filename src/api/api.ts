import { z } from 'zod'
import { AxiosPromise, AxiosResponse } from 'axios'

import { appUrl } from '../utils/url-utils'
import { axiosInstance } from './utils'
import {
	EndringsmeldingerSchema,
	EndringsmeldingSchema,
	ArrangorSchema,
	GjennomforingDetaljerSchema,
	GjennomforingerSchema,
	GjennomforingSchema,
	InnloggetNavAnsattSchema,
	HentGjennomforingMedLopenrSchema,
	HentGjennomforingerMedLopenrSchema,
	TiltakSchema
} from './schema'

export type InnloggetNavAnsattType = z.infer<typeof InnloggetNavAnsattSchema>

export type GjennomforingType = z.infer<typeof GjennomforingSchema>
export type GjennomforingerType = z.infer<typeof GjennomforingerSchema>

export type GjennomforingDetaljerType = z.infer<typeof GjennomforingDetaljerSchema>

export type ArrangorType = z.infer<typeof ArrangorSchema>

export type EndringsmeldingType = z.infer<typeof EndringsmeldingSchema>
export type EndringsmeldingerType = z.infer<typeof EndringsmeldingerSchema>

export type HentGjennomforingMedLopenrType = z.infer<typeof HentGjennomforingMedLopenrSchema>
export type HentGjennomforingerMedLopenrType = z.infer<typeof HentGjennomforingerMedLopenrSchema>

export type TiltakType = z.infer<typeof TiltakSchema>

const parseSchema = <T>(res: AxiosResponse, schema: z.ZodSchema<T>) => ({ ...res, data: schema.parse(res.data) })

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error
}

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetNavAnsattType> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, InnloggetNavAnsattSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforinger = (): AxiosPromise<GjennomforingerType> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforing = (id: string): AxiosPromise<GjennomforingDetaljerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingDetaljerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchEndringsmeldinger = (gjennomforingId: string): AxiosPromise<EndringsmeldingerType> => {
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
	const endepunkt = appUrl(`/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.post(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fjernGjennomforingFraOversikten = (gjennomforingId: string): AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang/stop?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const hentGjennomforingMedLopenr = (lopenr: number): AxiosPromise<HentGjennomforingerMedLopenrType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing?lopenr=${lopenr}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, HentGjennomforingerMedLopenrSchema))
		.catch((error) => exposeError(error, endepunkt))
}
