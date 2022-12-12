export enum RequestHandlerType {
	MOCK = 'mock', // Send requests to msw handler
	LOCAL = 'local', // Send requests to backend running on localhost
	DEV = 'dev', // Send requests to application running in dev environment
	PULL_REQUEST = 'PULL_REQUEST'
}

const DEFAULT_HANDLER = RequestHandlerType.MOCK

export const getProxyUrl = (): string => {
	return import.meta.env.VITE_MOCK_PROXY_URL || ''
}

export const localAmtTiltakUrl = (): string => {
	return import.meta.env.VITE_MOCK_LOCAL_AMT_TILTAK_URL || ''
}

export function getRequestHandlerType(): RequestHandlerType {
	return toNullableEnumValue(RequestHandlerType, import.meta.env.VITE_MOCK_REQUEST_HANDLER) || DEFAULT_HANDLER
}

export function getRequestCookie(): string {
	return import.meta.env.VITE_MOCK_REQUEST_COOKIE || ''
}

export function getRequestAuthHeader(): string {
	return import.meta.env.VITE_MOCK_REQUEST_AUTH_HEADER || ''
}

const toNullableEnumValue = <T extends { [k: string]: string }>(enumType: T, maybeEnumValue: string | undefined): T[keyof T] | undefined => {
	if (!maybeEnumValue) {
		return undefined
	}

	if (!Object.values(enumType).includes(maybeEnumValue)) {
		throw new Error('Invalid enum value: ' + maybeEnumValue)
	}

	return maybeEnumValue as T[keyof T]
}
