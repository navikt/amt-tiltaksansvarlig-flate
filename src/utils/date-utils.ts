import dayjs from 'dayjs'

export const formatDateStr = (dateStr: string): string => dayjs(dateStr).format('DD.MM.YYYY')

