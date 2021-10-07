import { AxiosPromise } from 'axios'

import { axiosInstance } from './utils'

export interface IsAuthenticated {
	isAuthenticated: boolean;
}

export const isAuthenticated = (): AxiosPromise<IsAuthenticated> => {
	return axiosInstance.get('/auth-proxy/is-authenticated')
}