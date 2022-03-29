import dayjs from 'dayjs'

import { EMDASH } from './constants'

export const formatDate = (date: Date | null): string => {
	if (!date) return EMDASH
	return dayjs(date).format('DD.MM.YYYY')
}
