import { Endringsmelding } from '../../../api/schema/endringsmelding'

export const sorterEndringsmeldinger = (e1: Endringsmelding, e2: Endringsmelding): number => {
	if(e1.deltaker.etternavn === e2.deltaker.etternavn) return e1.opprettetDato > e2.opprettetDato ? -1 : 1
	return e1.deltaker.etternavn > e2.deltaker.etternavn? 1 : -1
}