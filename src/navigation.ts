import { appUrl } from './utils/url-utils'

export const MAIN_PAGE_ROUTE = appUrl('/')

export const TILGANGSKONTROLL_PAGE_ROUTE = appUrl('/tilgangskontroll')

export const TILGANGSKONTROLL_ARRANGOR_ANSATT_PAGE_ROUTE = appUrl('/tilgangskontroll/ansatt/:ansattId')
