import { appUrl } from './utils/url-utils'

export const FORSIDE_PAGE_ROUTE = appUrl('/')
export const GJENNOMFORING_DETALJER_PAGE_ROUTE = appUrl('/gjennomforing/:gjennomforingId')
export const TILGANGSKONTROLL_PAGE_ROUTE = appUrl('/gjennomforing/:gjennomforingId/tilgangskontroll')
export const LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE = appUrl('/tilgang/gjennomforing')

export const tilgangskontrollPageUrl = (gjennomforingId: string): string => {
	return TILGANGSKONTROLL_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}

export const gjennomforingDetaljerPageUrl = (gjennomforingId: string): string => {
	return GJENNOMFORING_DETALJER_PAGE_ROUTE.replace(':gjennomforingId', gjennomforingId)
}