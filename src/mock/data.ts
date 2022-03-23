import faker from 'faker'

export const gjennomforinger = [
	{
		navn: 'Oppfølging Tjenesteområde 1',
		id: '1',
		arrangor: {
			organisasjonNavn: 'Venus AS',
			virksomhetNavn: 'Virksomhet AS'
		},
		startDato: faker.date.future().toISOString(),
		sluttDato: faker.date.future().toISOString()
	},
	{
		navn: 'Oppfølging Tjenesteområde 2',
		id: '2',
		arrangor: {
			organisasjonNavn: 'Merkur AS',
			virksomhetNavn: 'Virksomhet AS'

		},
		startDato: faker.date.future().toISOString(),
		sluttDato: faker.date.future().toISOString()
	},
	{
		navn: 'Oppfølging Tjenesteområde 3',
		id: '3',
		arrangor: {
			organisasjonNavn: null,
			virksomhetNavn: 'Virksomhet AS'
		},
		startDato: faker.date.past().toISOString(),
		sluttDato: faker.date.future().toISOString()
	}
]