import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { Endringsmelding, EndringsmeldingType } from '../../../../../api/schema/endringsmelding'
import { formatDate } from '../../../../../utils/date-utils'
import styles from '../Endringsmelding.module.scss'
import { varigheter, VarighetValg } from '../VarighetSelect'
import { AvsluttingInnhold } from './AvsluttingInnhold'
import { EndreDeltakelseProsentInnhold } from './EndreDeltakelseProsentInnhold'
import { OppstartInnhold } from './OppstartInnhold'

interface Props {
	endringsmelding: Endringsmelding
	varighetValg: VarighetValg
}

export const EndringsmeldingInnhold = ({ endringsmelding, varighetValg }: Props): React.ReactElement => {
	const varighet = varigheter[varighetValg] !== undefined ? varigheter[varighetValg] : varigheter[VarighetValg.IKKE_VALGT]

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
			return <AvsluttingInnhold sluttdato={endringsmelding.innhold.sluttdato}/>
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return <AvsluttingInnhold sluttdato={endringsmelding.innhold.sluttdato} aarsak={endringsmelding.innhold.aarsak}/>
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <AvsluttingInnhold aarsak={endringsmelding.innhold.aarsak}/>
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
			return <EndreDeltakelseProsentInnhold deltakelseProsent={endringsmelding.innhold.deltakelseProsent} dagerPerUke={endringsmelding.innhold.dagerPerUke} gyldigFraDato={endringsmelding.innhold.gyldigFraDato}/>
		case EndringsmeldingType.ENDRE_SLUTTDATO:
			return <BodyShort size="small" className={styles.endringInfoTekst}>Ny sluttdato: {formatDate(endringsmelding.innhold.sluttdato)}</BodyShort>
		default: return <></>
	}
}