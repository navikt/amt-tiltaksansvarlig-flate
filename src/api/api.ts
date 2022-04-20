import { z } from 'zod'
import { AxiosPromise, AxiosResponse } from 'axios'

import { appUrl } from '../utils/url-utils'
import { axiosInstance } from './utils'
import {
	ArrangorSchema,
	DeltakereSchema,
	DeltakerSchema,
	GjennomforingerSchema,
	GjennomforingSchema,
	InnloggetNavAnsattSchema,
	IsAuthenticatedSchema,
	TilgangerSchema,
	TilgangSchema,
	UbesluttedeTilgangForesporslerSchema,
	UbesluttetTilgangForesporselSchema,
	UbrukteTilgangInvitasjonerSchema,
	UbruktTilgangInvitasjonSchema
} from './schema'

export type IsAuthenticated = z.infer<typeof IsAuthenticatedSchema>

export type InnloggetNavAnsatt = z.infer<typeof InnloggetNavAnsattSchema>

export type Gjennomforing = z.infer<typeof GjennomforingSchema>
export type Gjennomforinger = z.infer<typeof GjennomforingerSchema>

export type Arrangor = z.infer<typeof ArrangorSchema>

export type Deltaker = z.infer<typeof DeltakerSchema>
export type Deltakere = z.infer<typeof DeltakereSchema>

export type Tilgang = z.infer<typeof TilgangSchema>
export type Tilganger = z.infer<typeof TilgangerSchema>

export type UbruktTilgangInvitasjon = z.infer<typeof UbruktTilgangInvitasjonSchema>
export type UbrukteTilgangInvitasjoner = z.infer<typeof UbrukteTilgangInvitasjonerSchema>

export type UbesluttetTilgangForesporsel = z.infer<typeof UbesluttetTilgangForesporselSchema>
export type UbesluttedeTilgangForesporsler = z.infer<typeof UbesluttedeTilgangForesporslerSchema>

const parseSchema = <T>(res: AxiosResponse, schema: z.ZodSchema<T>) => ({ ...res, data: schema.parse(res.data) })

const exposeError = (error: Error, endepunkt: string) => {
	// eslint-disable-next-line no-console
	console.error(`Kall mot ${endepunkt} feilet. message: ${error.message}`)
	throw error
}

export const fetchIsAuthenticated = (): AxiosPromise<IsAuthenticated> => {
	const endepunkt = appUrl('/auth/info')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, IsAuthenticatedSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchInnloggetAnsatt = (): AxiosPromise<InnloggetNavAnsatt> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/auth/meg')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, InnloggetNavAnsattSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchGjennomforinger = () : AxiosPromise<Gjennomforinger> => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/gjennomforing')
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingerSchema))
		.catch((error) => exposeError(error, endepunkt))

}

export const fetchGjennomforing = (id: string) : AxiosPromise<Gjennomforing> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, GjennomforingSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchDeltakere = (id: string) : AxiosPromise<Deltakere> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/gjennomforing/${id}/deltakere`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, DeltakereSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchAnsattTilganger = (gjennomforingId: string) : AxiosPromise<Tilganger> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, TilgangerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const stopAnsattTilgang = (tilgangId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/${tilgangId}/stop`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchUbrukteTilgangInvitasjoner = (gjennomforingId: string) : AxiosPromise<UbrukteTilgangInvitasjoner> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/ubrukt?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, UbrukteTilgangInvitasjonerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const opprettInvitasjon = (gjennomforingId: string) : AxiosPromise => {
	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon')
	return axiosInstance.post(endepunkt, { gjennomforingId: gjennomforingId })
		.catch((error) => exposeError(error, endepunkt))
}

export const slettInvitasjon = (invitasjonId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/${invitasjonId}`)
	return axiosInstance.delete(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const fetchUbesluttedeTilgangForesporsler = (gjennomforingId: string) : AxiosPromise<UbesluttedeTilgangForesporsler> => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/ubesluttet?gjennomforingId=${gjennomforingId}`)
	return axiosInstance.get(endepunkt)
		.then((res: AxiosResponse) => parseSchema(res, UbesluttedeTilgangForesporslerSchema))
		.catch((error) => exposeError(error, endepunkt))
}

export const godkjennForesporsel = (foresporselId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/${foresporselId}/godkjenn`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}

export const avvisForesporsel = (foresporselId: string) : AxiosPromise => {
	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/${foresporselId}/avvis`)
	return axiosInstance.patch(endepunkt)
		.catch((error) => exposeError(error, endepunkt))
}
