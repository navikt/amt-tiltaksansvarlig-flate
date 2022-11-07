import faker from 'faker'
import { Endringsmelding } from '../api/api'
import { EndringsmeldingStatus, EndringsmeldingType } from '../api/schema/endringsmelding'

export const endringsmeldingData: Endringsmelding[] = [
	{
		id: faker.datatype.uuid(),
		deltaker: {
			fornavn: 'Tine',
			mellomnavn: null,
			etternavn: 'Traust',
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
			fornavn: 'Lur',
			mellomnavn: 'Lutlei',
			etternavn: 'Luresen',
			fodselsnummer: '03035512347'
		},
		type: EndringsmeldingType.AVSLUTT_DELTAKELSE,
		status: EndringsmeldingStatus.AKTIV,
		innhold: { sluttdato: faker.date.soon(), aarsak: 'ANNET' },
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
		type: EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO,
		status: EndringsmeldingStatus.UTDATERT,
		innhold: { oppstartsdato: faker.date.past() },
		opprettetDato: faker.date.recent()
	}
]
