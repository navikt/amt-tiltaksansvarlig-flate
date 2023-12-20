import { Endringsmelding, Vurdering } from '../../../api/schema/meldinger'

export enum EndringsmeldingSortering {
	ALFABETISK,
	DATO_SENDT_DESC,
	UTFORT_TIDSPUNKT_DESC,
}

export const sorterMeldingerAlfabetisk = (e1: Vurdering | Endringsmelding, e2: Vurdering | Endringsmelding): number => {
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

export const sorterMeldingerDatoSendtDesc = (e1: Vurdering | Endringsmelding, e2: Vurdering | Endringsmelding): number => {
	if (e1.opprettetDato === e2.opprettetDato) {
		return sorterMeldingerAlfabetisk(e1, e2)
	}
	return e1.opprettetDato > e2.opprettetDato ? -1 : 1
}

export const sorterEndringsmeldingerUtfortDatoDesc = (e1: Endringsmelding, e2: Endringsmelding): number => {
	if (e1.utfortTidspunkt === null) return 1
	if (e2.utfortTidspunkt === null) return -1
	if (e1.utfortTidspunkt === e2.utfortTidspunkt) {
		return sorterMeldingerAlfabetisk(e1, e2)
	}
	return e1.opprettetDato > e2.opprettetDato ? -1 : 1
}

export const getSortering = (sortering: EndringsmeldingSortering): (e1: Endringsmelding, e2: Endringsmelding) => number => {
	switch (sortering) {
		case EndringsmeldingSortering.ALFABETISK: return sorterMeldingerAlfabetisk
		case EndringsmeldingSortering.DATO_SENDT_DESC: return sorterMeldingerDatoSendtDesc
		case EndringsmeldingSortering.UTFORT_TIDSPUNKT_DESC: return sorterEndringsmeldingerUtfortDatoDesc
	}
}
