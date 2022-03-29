import faker from 'faker'
import { Tilganger, UbesluttedeTilgangForesporsler, UbrukteTilgangInvitasjoner } from '../api/api'
import { randomFnr } from './utils/faker'

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

export const ansattTilganger: Tilganger = [
	{
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		opprettetDato: faker.date.recent(),
		opprettetAvNavIdent: 'Z1234'
	},
	{
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		opprettetDato: faker.date.recent(),
		opprettetAvNavIdent: 'Z1234'
	}
]

export const ubrukteInvitasjoner: UbrukteTilgangInvitasjoner = [
	{
		id: faker.datatype.uuid(),
		opprettetDato: faker.date.past(),
		gyldigTilDato: faker.date.soon(),
		opprettetAvNavIdent: 'Z1234'
	}
]

export const ubesluttedeForesporsler: UbesluttedeTilgangForesporsler = [
	{
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		fodselsnummer: randomFnr(),
		opprettetDato: faker.date.recent(),
	}
]
