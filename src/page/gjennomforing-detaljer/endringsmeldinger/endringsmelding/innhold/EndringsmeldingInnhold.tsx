import React from 'react'
import { Endringsmelding, EndringsmeldingType } from '../../../../../api/schema/endringsmelding'
import { AvsluttingsInnhold } from './AvsluttingsInnhold'
import { OppstartsInnhold } from './OppstartsInnhold'


interface IProps {
	endringsmelding: Endringsmelding
	varighet?: number
}

export const EndringsmeldingInnhold = ({ endringsmelding, varighet }: IProps): React.ReactElement => {
	switch (endringsmelding.type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return (
				<OppstartsInnhold
					oppstartsdato={endringsmelding.innhold.oppstartsdato}
					status={endringsmelding.status} varighet={varighet !== undefined ? varighet : 0}
				/>)
		case EndringsmeldingType.FORLENG_DELTAKELSE:
			return <AvsluttingsInnhold sluttdato={endringsmelding.innhold.sluttdato} />
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return <AvsluttingsInnhold sluttdato={endringsmelding.innhold.sluttdato} aarsak={endringsmelding.innhold.aarsak} />
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <AvsluttingsInnhold aarsak={endringsmelding.innhold.aarsak} />
	}
}
