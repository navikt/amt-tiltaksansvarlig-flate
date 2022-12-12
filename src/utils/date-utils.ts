import dayjs from 'dayjs'

import { Varighet } from '../page/gjennomforing-detaljer/endringsmeldinger/endringsmelding/VarighetSelect'
import { EMDASH } from './constants'

export const formatDate = (date: Date | null): string => {
	if (!date) return EMDASH
	return dayjs(date).format('DD.MM.YYYY')
}


export const formatDateMedMndNavn = (date: Date | null) => {
	if (!date) return EMDASH
	return dayjs(date).format('D. MMMM YYYY')
}

export const beregnSluttDato = (date: Date, varighet: Varighet): Date => {
	return dayjs(date).add(varighet.antall, varighet.tidsenhet).subtract(1, 'day').toDate()
}
