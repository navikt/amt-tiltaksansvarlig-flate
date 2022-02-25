import { AxiosPromise } from 'axios'

import { appUrl } from '../utils/url-utils'
import { Ansatt } from './data/ansatt'
import { PersonInfo } from './data/person-info'
import { axiosInstance } from './utils'

export interface IsAuthenticated {
	isAuthenticated: boolean;
}

export const isAuthenticated = (): AxiosPromise<IsAuthenticated> => {
	return axiosInstance.get(appUrl('/app/is-authenticated'))
}

export const sokEtterPerson = (fnr: string): AxiosPromise<PersonInfo> => {
	return axiosInstance.get(appUrl(`/app/person?fnr=${fnr}`))
}

export const hentAlleAnsatte = (): AxiosPromise<Ansatt[]> => {
	return axiosInstance.get(appUrl('/app/ansatt'))
}