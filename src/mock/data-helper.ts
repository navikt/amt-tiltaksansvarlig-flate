import {
	GjennomforingerType,
	TilgangType,
	TilgangerType,
	TilgangForesporslerType,
	TilgangForesporselType,
	UbrukteTilgangInvitasjonerType,
	UbruktTilgangInvitasjonType
} from '../api/api'
import { randBetween, randomFnr } from './utils/faker'
import faker from 'faker'

const opprettMockTilgang = (): TilgangType => {
	return {
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		opprettetDato: faker.date.past(),
		opprettetAvNavIdent: 'Z1234'
	}
}

export const opprettMockUbruktInvitasjon = (): UbruktTilgangInvitasjonType => {
	return {
		id: faker.datatype.uuid(),
		opprettetDato: faker.date.past(),
		gyldigTilDato: faker.date.soon(),
		opprettetAvNavIdent: 'Z1234'
	}
}

export const opprettMockUbesluttetForesporsel = (): TilgangForesporselType => {
	return {
		id: faker.datatype.uuid(),
		fornavn: faker.name.firstName(),
		mellomnavn: null,
		etternavn: faker.name.lastName(),
		fodselsnummer: randomFnr(),
		opprettetDato: faker.date.recent(),
	}
}

export const opprettMockGjennomforingTilganger = (gjennomforinger: GjennomforingerType): { [gjennomforingId: string]: TilgangerType } => {
	const gjennomforingTilganger: { [gjennomforingId: string]: TilgangerType } = {}

	gjennomforinger.forEach(g => {
		const tilganger: TilgangerType = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			tilganger.push(opprettMockTilgang())
		}

		gjennomforingTilganger[g.id] = tilganger
	})

	return gjennomforingTilganger
}


export const opprettMockGjennomforingInvitasjoner = (gjennomforinger: GjennomforingerType): { [gjennomforingId: string]: UbrukteTilgangInvitasjonerType } => {
	const gjennomforingInvitasjoner: { [gjennomforingId: string]: UbrukteTilgangInvitasjonerType } = {}

	gjennomforinger.forEach(g => {
		const invitasjoner: UbrukteTilgangInvitasjonerType = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			invitasjoner.push(opprettMockUbruktInvitasjon())
		}

		gjennomforingInvitasjoner[g.id] = invitasjoner
	})

	return gjennomforingInvitasjoner
}

export const opprettMockGjennomforingForesporsler = (gjennomforinger: GjennomforingerType): { [gjennomforingId: string]: TilgangForesporslerType } => {
	const gjennomforingForesporsler: { [gjennomforingId: string]: TilgangForesporslerType } = {}

	gjennomforinger.forEach(g => {
		const invitasjoner: TilgangForesporslerType = []
		const antall = randBetween(0, 1)

		for (let i = 0; i < antall; i++) {
			invitasjoner.push(opprettMockUbesluttetForesporsel())
		}

		gjennomforingForesporsler[g.id] = invitasjoner
	})

	return gjennomforingForesporsler
}
