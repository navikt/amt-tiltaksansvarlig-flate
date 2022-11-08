import axios from 'axios'
import { z, ZodEffects } from 'zod'

import { APP_NAME } from '../constants'

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME },
})

export const processStringToDate = z.preprocess((val) => (val ? new Date(val as string) : null), z.date()) as ZodEffects<z.ZodDate>
