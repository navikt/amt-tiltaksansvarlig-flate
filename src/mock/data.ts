import faker from 'faker'
import {
	GjennomforingDetaljerType,
	InnloggetNavAnsattType,
} from '../api/api'

export const innloggetAnsatt: InnloggetNavAnsattType = {
	navIdent: 'Z1234',
	navn: faker.name.firstName() + ' ' + faker.name.lastName(),
}

export const gjennomforinger: GjennomforingDetaljerType[] = [
	{
		navn: 'Oppfølging Tjenesteområde 1',
		id: '6ec95b2a-be19-41f0-9c97-1f81ab2159c3',
		arrangor: {
			organisasjonNavn: 'Venus AS',
			virksomhetNavn: 'Virksomhet AS'
		},
		tiltakNavn: 'Oppfølging',
		lopenr: 31243,
		opprettetAr: 2022,
		startDato: faker.date.past(),
		sluttDato: faker.date.future()
	},
	{
		navn: 'Oppfølging Tjenesteområde 2',
		id: 'a7f1ac51-4a7a-4d9b-b239-db452a9ee2c7',
		arrangor: {
			organisasjonNavn: 'Merkur AS',
			virksomhetNavn: 'Virksomhet AS'

		},
		tiltakNavn: 'Oppfølging',
		lopenr: 9243,
		opprettetAr: 2022,
		startDato: faker.date.future(),
		sluttDato: faker.date.future()
	},
	{
		navn: 'Oppfølging Tjenesteområde 3',
		id: 'c1a4ae05-983e-4f49-9e35-592a04248379',
		arrangor: {
			organisasjonNavn: null,
			virksomhetNavn: 'Virksomhet AS'
		},
		tiltakNavn: 'Oppfølging',
		lopenr: 75634,
		opprettetAr: 2022,
		startDato: faker.date.past(),
		sluttDato: faker.date.future()
	}
]

const gjennomforingTilganger = opprettMockGjennomforingTilganger(gjennomforinger)

const gjennomforingInvitasjoner = opprettMockGjennomforingInvitasjoner(gjennomforinger)

const gjennomforingForesporsler = opprettMockGjennomforingForesporsler(gjennomforinger)


export const hentTilganger = (gjennomforingId: string): TilgangerType => {
	return gjennomforingTilganger[gjennomforingId]
}

export const fjernTilgang = (tilgangId: string) => {
	const gjennomforingId = finnKeyForValue(tilgangId, gjennomforingTilganger)
	const oppdatertTilganger = gjennomforingTilganger[gjennomforingId].filter(t => t.id !== tilgangId)

	gjennomforingTilganger[gjennomforingId] = oppdatertTilganger
}


export const hentUbrukteInvitasjoner = (gjennomforingId: string): UbrukteTilgangInvitasjonerType => {
	return gjennomforingInvitasjoner[gjennomforingId]
}

export const opprettInvitasjon = (gjennomforingId: string) => {
	const nyInvitasjon = opprettMockUbruktInvitasjon()
	gjennomforingInvitasjoner[gjennomforingId].push(nyInvitasjon)
}

export const fjernUbruktInvitasjon = (invitasjonId: string) => {
	const gjennomforingId = finnKeyForValue(invitasjonId, gjennomforingInvitasjoner)
	const oppdatertInvitasjoner = gjennomforingInvitasjoner[gjennomforingId].filter(i => i.id !== invitasjonId)

	gjennomforingInvitasjoner[gjennomforingId] = oppdatertInvitasjoner
}

export const hentUbesluttedeForesporsler = (gjennomforingId: string): TilgangForesporslerType => {
	return gjennomforingForesporsler[gjennomforingId]
}

export const godkjennForesporsel = (foresporselId: string) => {
	const gjennomforingId = finnKeyForValue(foresporselId, gjennomforingForesporsler)
	const foresporsel = gjennomforingForesporsler[gjennomforingId].find(f => f.id === foresporselId) as TilgangForesporselType

	gjennomforingTilganger[gjennomforingId].push({
		id: faker.datatype.uuid(),
		fornavn: foresporsel.fornavn,
		mellomnavn: foresporsel.mellomnavn,
		etternavn: foresporsel.etternavn,
		opprettetDato: new Date(),
		opprettetAvNavIdent: 'Z1234'
	})

	fjernUbesluttedForesporsel(foresporselId)
}

export const fjernUbesluttedForesporsel = (foresporselId: string) => {
	const gjennomforingId = finnKeyForValue(foresporselId, gjennomforingForesporsler)
	const oppdatertForesporsler = gjennomforingForesporsler[gjennomforingId].filter(f => f.id !== foresporselId)

	gjennomforingForesporsler[gjennomforingId] = oppdatertForesporsler
}

const finnKeyForValue = <T extends { id: string }>(valueId: string, map: { [k: string]: T[] }): string => {
	const key = Object.keys(map)
		.find(k => {
			return !!map[k].find(d => d.id === valueId)
		})

	if (!key) {
		throw Error(`Unable to find value: ${valueId} in: ${JSON.stringify(map)}`)
	}

	return key
}
