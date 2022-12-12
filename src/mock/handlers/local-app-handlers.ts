import { ResponseComposition, rest, RestContext, RestRequest } from 'msw'
import { RequestHandler } from 'msw/lib/types/handlers/RequestHandler'
import { MockedResponse } from 'msw/lib/types/response'

import environment from '../../utils/environment'
import { appUrl } from '../../utils/url-utils'
import { getRequestAuthHeader, localAmtTiltakUrl } from '../utils/mock-env'
import { joinUrlAndPath, stripContextPath } from '../utils/url-utils'
import { forwardRequest } from '../utils/request-utils'

export const localAppHandlers: RequestHandler[] = [
	rest.all(appUrl('/amt-tiltak/*'), async(req, res, ctx) => {
		return handleReq(localAmtTiltakUrl(), req, res, ctx)
	})
]

const handleReq = async(proxyUrl: string, req: RestRequest, res: ResponseComposition, ctx: RestContext): Promise<MockedResponse> => {
	const reqPath = stripContextPath(req.url.pathname, `${environment.baseUrl}amt-tiltak`)
	const proxiedUrl = `${joinUrlAndPath(proxyUrl, reqPath)}${req.url.search}`

	req.headers.append('Authorization', getRequestAuthHeader())

	return forwardRequest(proxiedUrl, req, res, ctx)
}
