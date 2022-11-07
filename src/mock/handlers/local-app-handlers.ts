import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import environment from '../../utils/environment'
import { appUrl } from '../../utils/url-utils'
import { getRequestAuthHeader, localAmtTiltakUrl } from '../utils/mock-env'
import { joinUrlAndPath, stripContextPath } from '../utils/url-utils'

export const localAppHandlers: RequestHandler[] = [
	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return handleReq(localAmtTiltakUrl(), req, res, ctx)
	})
]

const handleReq = async(proxyUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const reqPath = stripContextPath(req.url.pathname, `${environment.publicUrl}/amt-tiltak`)
	const proxiedUrl = `${joinUrlAndPath(proxyUrl, reqPath)}${req.url.search}`

	try {
		req.headers.append('Authorization', getRequestAuthHeader())

		const response = await ctx.fetch(proxiedUrl, {
			method: req.method,
			body: req.body ? JSON.stringify(req.body) : null,
			headers: req.headers
		})

		const bodyText = await response.text()

		return res(ctx.status(response.status), ctx.body(bodyText))
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error('Request to proxy failed', e)
		return res(ctx.status(500))
	}
}
