import environment, { erProdMiljo } from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path
	return `${environment.baseUrl}${strippedPath}`
}

export const apiUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path

	return `${environment.baseUrl}${strippedPath}`
		.replace(/\/pr-\d+\//, '/')  // Fjerner "pr-DDD/" om det er en pr branch
}

export const mulighetsrommetAdminUrl = `https://mulighetsrommet-admin-flate.intern.${erProdMiljo ? '' : 'dev.'}nav.no`
export const mulighetsrommetVeilederUrl = `https://mulighetsrommet-veileder-flate.intern.${erProdMiljo ? '' : 'dev.'}nav.no/preview`
export const mulighetsrommetSanityUrl = 'https://mulighetsrommet-sanity-studio.intern.nav.no/prod/desk'
