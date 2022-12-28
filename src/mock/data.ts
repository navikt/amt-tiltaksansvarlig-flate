import faker from 'faker'

import { InnloggetNavAnsatt } from '../api/api'

interface Gjennomforing {
	navn: string,
	id: string,
	arrangor: {
		organisasjonNavn: string | null,
		organisasjonOrgnr: string | null,
		virksomhetNavn: string,
		virksomhetOrgnr: string,
	},
	lopenr: number,
	opprettetAr: number,
	startDato: Date,
	sluttDato: Date,
	antallAktiveEndringsmeldinger: number,
	tiltak: {
		kode: string,
		navn: string,
	},
}

export const innloggetAnsatt: InnloggetNavAnsatt = {
	navIdent: 'Z1234',
	navn: faker.name.firstName() + ' ' + faker.name.lastName(),
}

export const gjennomforinger: Gjennomforing[] = [
	{
		navn: 'Oppfølging Tjenesteområde 1',
		id: '6ec95b2a-be19-41f0-9c97-1f81ab2159c3',
		arrangor: {
			organisasjonNavn: 'Venus AS',
			organisasjonOrgnr: '9934872368',
			virksomhetNavn: 'Virksomhet AS',
			virksomhetOrgnr: '8798324354',
		},
		lopenr: 31243,
		opprettetAr: 2022,
		startDato: faker.date.past(),
		sluttDato: faker.date.future(),
		antallAktiveEndringsmeldinger: 2,
		tiltak: {
			kode: 'INDOPPFAG',
			navn: 'Oppfølging',
		},
	},
	{
		navn: 'Oppfølging Tjenesteområde 2',
		id: 'a7f1ac51-4a7a-4d9b-b239-db452a9ee2c7',
		arrangor: {
			organisasjonNavn: 'Merkur AS',
			organisasjonOrgnr: '409857349',
			virksomhetNavn: 'Virksomhet AS',
			virksomhetOrgnr: '56546745654'
		},
		lopenr: 9243,
		opprettetAr: 2022,
		startDato: faker.date.future(),
		sluttDato: faker.date.future(),
		antallAktiveEndringsmeldinger: 0,
		tiltak: {
			kode: 'INDOPPFAG',
			navn: 'Oppfølging',
		},
	},
	{
		navn: 'AFT Tjenesteområde 3',
		id: 'c1a4ae05-983e-4f49-9e35-592a04248379',
		arrangor: {
			organisasjonNavn: null,
			organisasjonOrgnr: null,
			virksomhetNavn: 'Pluto AS',
			virksomhetOrgnr: '48930578349'
		},
		lopenr: 75634,
		opprettetAr: 2022,
		startDato: faker.date.past(),
		sluttDato: faker.date.future(),
		antallAktiveEndringsmeldinger: 1,
		tiltak: {
			kode: 'ARBFORB',
			navn: 'Arbeidsforberedende trening (AFT)',
		},
	},
	{
		navn: 'Avklaring Tjenesteområde 4',
		id: '70a660b0-6529-421f-b957-042a9499986e',
		arrangor: {
			organisasjonNavn: null,
			organisasjonOrgnr: null,
			virksomhetNavn: 'Mars AS',
			virksomhetOrgnr: '34290472398'
		},
		lopenr: 67182,
		opprettetAr: 2022,
		startDato: faker.date.past(),
		sluttDato: faker.date.future(),
		antallAktiveEndringsmeldinger: 1,
		tiltak: {
			kode: 'AVKLARAG',
			navn: 'Avklaring',
		},
	},
]
