import environment from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path
	return `${getBaseUrl()}${strippedPath}`
}

const getBaseUrl = (): string => {
	return environment.baseUrl.replace(/\/pr-\d+\//, '/') // Fjerner "pr-DDD/" om det er en pr branch
}
