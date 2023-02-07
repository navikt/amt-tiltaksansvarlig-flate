import axios from 'axios'
import dayjs from 'dayjs'
import { z, ZodEffects } from 'zod'

import { APP_NAME } from '../constants'

export const axiosInstance = axios.create({
	withCredentials: true,
	headers: { 'Nav-Consumer-Id': APP_NAME },
})

export const processStringToDate = z.preprocess((val) => (val ? new Date(val as string) : null), z.date()) as ZodEffects<z.ZodDate>

export const processStringToNullableDate = z.preprocess((val) => {
	if (!val) return null
	if (typeof val == 'string') return dayjs(val).toDate()
}, z.date().nullable())
