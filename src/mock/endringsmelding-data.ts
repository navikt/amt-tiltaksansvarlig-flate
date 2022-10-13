import faker from 'faker'

export const endringsmeldingData = [
	{
		id: faker.datatype.uuid(),
		bruker: {
			fornavn: 'Tine',
			mellomnavn: null,
			etternavn: 'Traust',
			fodselsnummer: '03035512347'
		},
		startDato: faker.date.soon(),
		sluttDato: null,
		aktiv: true,
		godkjent: false,
		arkivert: false,
		opprettetAvArrangorAnsatt: {
			fornavn: 'Trine',
			mellomnavn: null,
			etternavn: 'Triviell'
		},
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		bruker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		startDato: faker.date.soon(),
		sluttDato: null,
		aktiv: true,
		godkjent: false,
		arkivert: false,
		opprettetAvArrangorAnsatt: {
			fornavn: 'Trine',
			mellomnavn: null,
			etternavn: 'Triviell'
		},
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		bruker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		startDato: null,
		sluttDato: faker.date.future(),
		aktiv: true,
		godkjent: false,
		arkivert: false,
		opprettetAvArrangorAnsatt: {
			fornavn: 'Trine',
			mellomnavn: null,
			etternavn: 'Triviell'
		},
		opprettetDato: faker.date.recent()
	}
]
