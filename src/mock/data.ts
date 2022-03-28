import faker from 'faker'
import { AnsattTilganger, AnsattTilgangInvitasjoner } from '../api/api'
import { InvitasjonStatus } from '../api/schema'
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

export const ansattInvitasjoner: AnsattTilgangInvitasjoner = [
	{
		id: faker.datatype.uuid(),
		invitertAnsatt: {
			fornavn: faker.name.firstName(),
			mellomnavn: null,
			etternavn: faker.name.lastName(),
			fodselsnummer: randomFnr()
		},
		tidspunktBrukt: faker.date.recent(),
		status: InvitasjonStatus.BRUKT,
		opprettetDato: faker.date.past(),
		gyldigTilDato: faker.date.soon(),
	},
	{
		id: faker.datatype.uuid(),
		invitertAnsatt: null,
		tidspunktBrukt: null,
		status: InvitasjonStatus.UBRUKT,
		opprettetDato: faker.date.past(),
		gyldigTilDato: faker.date.soon(),
	}
]
