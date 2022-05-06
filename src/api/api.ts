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
	IsAuthenticatedSchema,
	TilgangerSchema,
	TilgangSchema,
	TilgangForesporslerSchema,
	TilgangForesporselSchema,
	UbrukteTilgangInvitasjonerSchema,
	UbruktTilgangInvitasjonSchema,
	HentGjennomforingMedLopenrSchema,
	HentGjennomforingerMedLopenrSchema
} from './schema'

export type IsAuthenticatedType = z.infer<typeof IsAuthenticatedSchema>

export type InnloggetNavAnsattType = z.infer<typeof InnloggetNavAnsattSchema>

export type GjennomforingType = z.infer<typeof GjennomforingSchema>
export type GjennomforingerType = z.infer<typeof GjennomforingerSchema>

export type GjennomforingDetaljerType = z.infer<typeof GjennomforingDetaljerSchema>

export type ArrangorType = z.infer<typeof ArrangorSchema>

export type TilgangType = z.infer<typeof TilgangSchema>
export type TilgangerType = z.infer<typeof TilgangerSchema>

export type UbruktTilgangInvitasjonType = z.infer<typeof UbruktTilgangInvitasjonSchema>
export type UbrukteTilgangInvitasjonerType = z.infer<typeof UbrukteTilgangInvitasjonerSchema>

export type TilgangForesporselType = z.infer<typeof TilgangForesporselSchema>
export type TilgangForesporslerType = z.infer<typeof TilgangForesporslerSchema>

export type EndringsmeldingType = z.infer<typeof EndringsmeldingSchema>
export type EndringsmeldingerType = z.infer<typeof EndringsmeldingerSchema>

export type HentGjennomforingMedLopenrType = z.infer<typeof HentGjennomforingMedLopenrSchema>
export type HentGjennomforingerMedLopenrType = z.infer<typeof HentGjennomforingerMedLopenrSchema>

const parseSchema = <T>(res: AxiosResponse, schema: z.ZodSchema<T>) => ({ ...res, data: schema.parse(res.data) })

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error
}

export const fetchIsAuthenticated = (): AxiosPromise<IsAuthenticatedType> => {
	const endepunkt = appUrl('/auth/info')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, IsAuthenticatedSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetNavAnsattType> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/autentisering/meg')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, InnloggetNavAnsattSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforinger = () : AxiosPromise<GjennomforingerType> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforing = (id: string) : AxiosPromise<GjennomforingDetaljerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingDetaljerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchAnsattTilganger = (gjennomforingId: string) : AxiosPromise<TilgangerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, TilgangerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const stopAnsattTilgang = (tilgangId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/${tilgangId}/stop`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchUbrukteTilgangInvitasjoner = (gjennomforingId: string) : AxiosPromise<UbrukteTilgangInvitasjonerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon/ubrukt?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, UbrukteTilgangInvitasjonerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const opprettInvitasjon = (gjennomforingId: string) : AxiosPromise => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon')
	return axiosInstance.post(endepunkt, { gjennomforingId: gjennomforingId })
		.catch((error) => exposeError(error, endepunkt))
}

export const slettInvitasjon = (invitasjonId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/invitasjon/${invitasjonId}`)
	return axiosInstance.delete(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchUbesluttedeTilgangForesporsler = (gjennomforingId: string) : AxiosPromise<TilgangForesporslerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/ubesluttet?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, TilgangForesporslerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const godkjennForesporsel = (foresporselId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/${foresporselId}/godkjenn`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const avvisForesporsel = (foresporselId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/arrangor-ansatt-tilgang/foresporsel/${foresporselId}/avvis`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchEndringsmeldinger = (gjennomforingId: string) : AxiosPromise<EndringsmeldingerType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, EndringsmeldingerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const markerEndringsmeldingSomFerdig = (endringsmeldingId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/endringsmelding/${endringsmeldingId}/ferdig`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const leggTilTilgangTilGjennomforing = (gjennomforingId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.post(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const stopTilgangTilGjennomforing = (gjennomforingId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/tiltaksansvarlig/gjennomforing-tilgang/stop?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const hentGjennomforingMedLopenr = (lopenr: number) : AxiosPromise<HentGjennomforingerMedLopenrType> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing?lopenr=${lopenr}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, HentGjennomforingerMedLopenrSchema))
		.catch((error) => exposeError(error, endepunkt))
}
