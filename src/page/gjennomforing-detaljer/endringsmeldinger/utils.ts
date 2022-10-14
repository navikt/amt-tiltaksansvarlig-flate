type Endringsmelding = { opprettetDato: Date }

export const sorterEndringsmeldingNyestFørst = (e1: Endringsmelding, e2: Endringsmelding): number => {
	return e1.opprettetDato > e2.opprettetDato ? -1 : 1
}

