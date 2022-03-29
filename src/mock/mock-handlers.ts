import { rest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'

import { appUrl } from '../utils/url-utils'
import { ubrukteInvitasjoner, ansattTilganger, ubesluttedeForesporsler, gjennomforinger } from './data'

export const mockHandlers: RequestHandler[] = [
	rest.get(appUrl('/amt-tiltak/api/is-authenticated'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json({
			isAuthenticated: true
		}))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(gjennomforinger))
	}),
	rest.get(appUrl('/amt-tiltak/api/gjennomforing/:id'), (req, res, ctx) => {
		const id = req.params['id']
		return res(ctx.delay(500), ctx.json(
			gjennomforinger.find(g => g.id === id)
		))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(ansattTilganger))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/:tilgangId/stop'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/ubrukt'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(ubrukteInvitasjoner))
	}),
	rest.post(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(201))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/:invitasjonId/avbryt'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),

	rest.get(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/ubesluttet'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.json(ubesluttedeForesporsler))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/:foresporselId/godkjenn'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	}),
	rest.patch(appUrl('/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/:foresporselId/avvis'), (req, res, ctx) => {
		return res(ctx.delay(500), ctx.status(200))
	})
]


// export const fetchTilgangInvitasjoner = (gjennomforingId: string) : AxiosPromise<AnsattTilgangInvitasjoner> => {
// 	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/invitasjon?gjennomforingId=${gjennomforingId}`)
// 	return axiosInstance.get(endepunkt)
// 		.then((res: AxiosResponse) => parseSchema(res, AnsattTilgangInvitasjonerSchema))
// 		.catch((error) => exposeError(error, endepunkt))
// }
//
// export const opprettInvitasjon = () : AxiosPromise => {
// 	const endepunkt = appUrl('/amt-tiltak/api/nav-ansatt/tilgang/invitasjon')
// 	return axiosInstance.post(endepunkt)
// 		.catch((error) => exposeError(error, endepunkt))
// }
//
// export const avbrytInvitasjon = (invitasjonId: string) : AxiosPromise => {
// 	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/invitasjon/${invitasjonId}/avbryt`)
// 	return axiosInstance.patch(endepunkt)
// 		.catch((error) => exposeError(error, endepunkt))
// }
//
// export const fetchTilgangForesporsler = (gjennomforingId: string) : AxiosPromise<AnsattTilgangForesporsler> => {
// 	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel?gjennomforingId=${gjennomforingId}`)
// 	return axiosInstance.get(endepunkt)
// 		.then((res: AxiosResponse) => parseSchema(res, AnsattTilgangForesporslerSchema))
// 		.catch((error) => exposeError(error, endepunkt))
// }
//
// export const godkjennForesporsel = (foresporselId: string) : AxiosPromise => {
// 	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/${foresporselId}/godkjenn`)
// 	return axiosInstance.patch(endepunkt)
// 		.catch((error) => exposeError(error, endepunkt))
// }
//
// export const avvisForesporsel = (foresporselId: string) : AxiosPromise => {
// 	const endepunkt = appUrl(`/amt-tiltak/api/nav-ansatt/tilgang/foresporsel/${foresporselId}/avvis`)
// 	return axiosInstance.patch(endepunkt)
// 		.catch((error) => exposeError(error, endepunkt))
// }


