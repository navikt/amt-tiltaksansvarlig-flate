export enum EndpointHandler {
  MOCK = 'MOCK',
  PROXY = 'PROXY',
  DEV = 'DEV',
  PROD = 'PROD'
}

export const getEndpointHandlerType = (): EndpointHandler => {
	return import.meta.env.VITE_ENDPOINT_HANDLER || EndpointHandler.PROD
}

class Environment {

	get baseUrl(): string {
		return import.meta.env.BASE_URL
	}

	get apiBaseUrl(): string {
		if (getEndpointHandlerType() === EndpointHandler.MOCK) {
			return '/mock/'
		}

		return import.meta.env.BASE_URL
	}
}

const env = new Environment()

export default env

export const erProdMiljo = window.location.href.includes('.intern.nav.no')
