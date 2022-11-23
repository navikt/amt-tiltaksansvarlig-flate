import React from 'react'
import { Endringsmelding, EndringsmeldingType } from '../../../../../api/schema/endringsmelding'
import { AvsluttingInnhold } from './AvsluttingInnhold'
import { OppstartInnhold } from './OppstartInnhold'
import { varigheter, VarighetValg } from '../VarighetSelect'


interface Props {
	endringsmelding: Endringsmelding
	varighetValg: VarighetValg
}

export const EndringsmeldingInnhold = ({ endringsmelding, varighetValg }: Props): React.ReactElement => {
	const varighet = varigheter[varighetValg]

	switch (endringsmelding.type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return (
				<OppstartInnhold
					oppstartsdato={endringsmelding.innhold.oppstartsdato}
					status={endringsmelding.status}
					varighet={varighet}
				/>)
		case EndringsmeldingType.FORLENG_DELTAKELSE:
			return <AvsluttingInnhold sluttdato={endringsmelding.innhold.sluttdato} />
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return <AvsluttingInnhold sluttdato={endringsmelding.innhold.sluttdato} aarsak={endringsmelding.innhold.aarsak} />
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <AvsluttingInnhold aarsak={endringsmelding.innhold.aarsak} />
	}
}
