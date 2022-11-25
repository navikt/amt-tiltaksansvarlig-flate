import faker from 'faker'
import { Endringsmelding, EndringsmeldingStatus, EndringsmeldingType, DeltakerStatusAarsakType } from '../api/schema/endringsmelding'

export const endringsmeldingData: Endringsmelding[] = [
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Tine',
			mellomnavn: null,
			etternavn: 'Traust',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
		status: EndringsmeldingStatus.AKTIV,
		innhold: { oppstartsdato: faker.date.soon() },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
		status: EndringsmeldingStatus.AKTIV,
		innhold: { oppstartsdato: faker.date.soon() },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Nataniel',
			mellomnavn: null,
			etternavn: 'Wood',
			fodselsnummer: '13018812347'
		},
		type: EndringsmeldingType.FORLENG_DELTAKELSE,
		status: EndringsmeldingStatus.AKTIV,
		innhold: { sluttdato: faker.date.soon() },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Mira',
			mellomnavn: null,
			etternavn: 'Bowler',
			fodselsnummer: '07099512347'
		},
		type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
		status: EndringsmeldingStatus.AKTIV,
		innhold: {
			sluttdato: faker.date.soon(),
			aarsak: {
				type: DeltakerStatusAarsakType.ANNET,
				beskrivelse: 'Har flyttet til annen kommune'
			}
		},
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Amelia',
			mellomnavn: null,
			etternavn: 'Hunter',
			fodselsnummer: '01108511382'
		},
		type: EndringsmeldingType.DELTAKER_IKKE_AKTUELL,
		status: EndringsmeldingStatus.AKTIV,
		innhold: { aarsak: { type: DeltakerStatusAarsakType.FEILREGISTRERT, beskrivelse: null } },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
		status: EndringsmeldingStatus.UTFORT,
		innhold: { oppstartsdato: faker.date.past() },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.ENDRE_OPPSTARTSDATO,
		status: EndringsmeldingStatus.UTDATERT,
		innhold: { oppstartsdato: faker.date.past() },
		opprettetDato: faker.date.recent()
	},
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
		status: EndringsmeldingStatus.TILBAKEKALT,
		innhold: { sluttdato: faker.date.past(), aarsak: { type: DeltakerStatusAarsakType.SYK, beskrivelse: null } },
		opprettetDato: faker.date.recent()
	},
]
