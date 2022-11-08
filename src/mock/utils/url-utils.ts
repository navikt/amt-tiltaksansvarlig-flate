export const stripContextPath = (path: string, contextPath: string): string => {
	if (path.startsWith(contextPath)) {
		return path.substring(contextPath.length, path.length)
	}

	return path
}

export const joinUrlAndPath = (url: string, path: string): string => {
	url = url.endsWith('/') ? url.substring(0, url.length - 1) : url
	path = path.startsWith('/') ? path.substring(1) : path

	return `${url}/${path}`
}
