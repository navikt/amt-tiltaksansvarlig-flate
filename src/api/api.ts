import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { axiosInstance } from './utils'

export interface IsAuthenticated {
	isAuthenticated: boolean;
}

export const isAuthenticated = (): AxiosPromise<IsAuthenticated> => {
	return axiosInstance.get(appUrl('/app/is-authenticated'))
}