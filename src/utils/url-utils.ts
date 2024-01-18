import environment from './environment'

export const appUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path
	return `${environment.baseUrl}${strippedPath}`
}

export const apiUrl = (path: string): string => {
	const strippedPath = path.startsWith('/') ? path.substring(1) : path

	return `${environment.baseUrl}${strippedPath}`
		.replace(/\/pr-\d+\//, '/')  // Fjerner "pr-DDD/" om det er en pr branch
}

