import {
	Gjennomforinger,
	Tilgang,
	Tilganger,
	UbesluttedeTilgangForesporsler,
	UbesluttetTilgangForesporsel,
	UbrukteTilgangInvitasjoner,
	UbruktTilgangInvitasjon
} from '../api/api'
import { randBetween, randomFnr } from './utils/faker'
import faker from 'faker'

const opprettMockTilgang = (): Tilgang => {
	return {
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		opprettetDato: faker.date.past(),
		opprettetAvNavIdent: 'Z1234'
	}
}

export const opprettMockUbruktInvitasjon = (): UbruktTilgangInvitasjon => {
	return {
		id: faker.datatype.uuid(),
		opprettetDato: faker.date.past(),
		gyldigTilDato: faker.date.soon(),
		opprettetAvNavIdent: 'Z1234'
	}
}

export const opprettMockUbesluttetForesporsel = (): UbesluttetTilgangForesporsel => {
	return {
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		fodselsnummer: randomFnr(),
		opprettetDato: faker.date.recent(),
	}
}

export const opprettMockGjennomforingTilganger = (gjennomforinger: Gjennomforinger): { [gjennomforingId: string]: Tilganger } => {
	const gjennomforingTilganger: { [gjennomforingId: string]: Tilganger } = {}

	gjennomforinger.forEach(g => {
		const tilganger: Tilganger = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			tilganger.push(opprettMockTilgang())
		}

		gjennomforingTilganger[g.id] = tilganger
	})

	return gjennomforingTilganger
}


export const opprettMockGjennomforingInvitasjoner = (gjennomforinger: Gjennomforinger): { [gjennomforingId: string]: UbrukteTilgangInvitasjoner } => {
	const gjennomforingInvitasjoner: { [gjennomforingId: string]: UbrukteTilgangInvitasjoner } = {}

	gjennomforinger.forEach(g => {
		const invitasjoner: UbrukteTilgangInvitasjoner = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			invitasjoner.push(opprettMockUbruktInvitasjon())
		}

		gjennomforingInvitasjoner[g.id] = invitasjoner
	})

	return gjennomforingInvitasjoner
}

export const opprettMockGjennomforingForesporsler = (gjennomforinger: Gjennomforinger): { [gjennomforingId: string]: UbesluttedeTilgangForesporsler } => {
	const gjennomforingForesporsler: { [gjennomforingId: string]: UbesluttedeTilgangForesporsler } = {}

	gjennomforinger.forEach(g => {
		const invitasjoner: UbesluttedeTilgangForesporsler = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			invitasjoner.push(opprettMockUbesluttetForesporsel())
		}

		gjennomforingForesporsler[g.id] = invitasjoner
	})

	return gjennomforingForesporsler
}
