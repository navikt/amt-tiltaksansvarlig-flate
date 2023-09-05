import { Endringsmelding, Vurdering } from '../../../api/schema/meldinger'

export const sorterMeldinger = (e1: Vurdering | Endringsmelding, e2: Vurdering | Endringsmelding): number => {
	if (e1.deltaker.etternavn === e2.deltaker.etternavn) {
		return e1.opprettetDato > e2.opprettetDato ? -1 : 1
	}
	if(!e1.deltaker.etternavn && !e2.deltaker.etternavn){
		return 1
	}
	if (!e1.deltaker.etternavn || !e2.deltaker.etternavn) {
		return e1.deltaker.etternavn? -1 : 1
	}

	return e1.deltaker.etternavn > e2.deltaker.etternavn ? 1 : -1
}