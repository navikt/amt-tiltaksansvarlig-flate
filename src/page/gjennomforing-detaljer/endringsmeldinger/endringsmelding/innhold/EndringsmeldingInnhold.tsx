import React from 'react'
import { Endringsmelding, EndringsmeldingType } from '../../../../../api/schema/endringsmelding'
import { AvsluttingsInnhold } from './AvsluttingsInnhold'
import { OppstartsInnhold } from './OppstartsInnhold'


interface Props {
	endringsmelding: Endringsmelding
	varighet: number | null
}

export const EndringsmeldingInnhold = ({ endringsmelding, varighet }: Props): React.ReactElement => {
	switch (endringsmelding.type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return (
				<OppstartsInnhold
					oppstartsdato={endringsmelding.innhold.oppstartsdato}
					status={endringsmelding.status}
					varighet={varighet}
				/>)
		case EndringsmeldingType.FORLENG_DELTAKELSE:
			return <AvsluttingsInnhold sluttdato={endringsmelding.innhold.sluttdato} />
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return <AvsluttingsInnhold sluttdato={endringsmelding.innhold.sluttdato} aarsak={endringsmelding.innhold.aarsak} />
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <AvsluttingsInnhold aarsak={endringsmelding.innhold.aarsak} />
	}
}
