import { appUrl } from './utils/url-utils'

export const FORSIDE_PAGE_ROUTE = appUrl('/')
export const GJENNOMFORING_PAGE_ROUTE = appUrl('/gjennomforing')
export const TILGANGSKONTROLL_PAGE_ROUTE = appUrl('/tilgangskontroll/:gjennomforingId')

export const tilgangskontrollPageUrl = (gjennomforingId: string): string => {
	return TILGANGSKONTROLL_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}