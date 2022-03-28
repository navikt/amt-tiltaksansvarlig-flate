import faker from 'faker'
import { AnsattTilganger } from '../api/api'

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

export const ansattTilganger: AnsattTilganger = [
	{
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		gyldigFraDato: faker.date.recent(),
		opprettetAvNavIdent: 'Z1234'
	},
	{
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		gyldigFraDato: faker.date.recent(),
		opprettetAvNavIdent: 'Z1234'
	}
]
