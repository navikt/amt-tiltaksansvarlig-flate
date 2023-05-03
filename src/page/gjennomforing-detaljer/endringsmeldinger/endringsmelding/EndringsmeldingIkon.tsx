import { CheckmarkCircleFillIcon, MenuElipsisHorizontalCircleFillIcon } from '@navikt/aksel-icons'
import {
	AddCircleFilled,
	ChevronRightCircleFilled,
	ChevronRightDoubleFilled,
	MinusCircleFilled
} from '@navikt/ds-icons'
import SvgDivideFilled from '@navikt/ds-icons/esm/DivideFilled'
import React from 'react'

import { EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import styles from './EndringsmeldingIkon.module.scss'

interface Props {
	type: EndringsmeldingType
}

export const EndringsmeldingIkon = ({ type }: Props): React.ReactElement => {
	switch (type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
			return <ChevronRightCircleFilled className={styles.endreIkon} aria-hidden/>
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return <ChevronRightCircleFilled className={styles.endreIkon} aria-hidden/>
		case  EndringsmeldingType.FORLENG_DELTAKELSE:
			return <ChevronRightDoubleFilled className={styles.forlengIkon} aria-hidden/>
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
			return <MinusCircleFilled className={styles.avsluttIkon} aria-hidden/>
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
			return <SvgDivideFilled className={styles.endreProsentDeltakelseIkon} aria-hidden/>
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <AddCircleFilled className={styles.ikkeAktuellIkon} aria-hidden/>
		case EndringsmeldingType.TILBY_PLASS:
			return <CheckmarkCircleFillIcon className={styles.tilbyPlassIkon} aria-hidden />
		case EndringsmeldingType.SETT_PAA_VENTELISTE:
			return <MenuElipsisHorizontalCircleFillIcon className={styles.settPaaVentelisteIkon} aria-hidden />
		case EndringsmeldingType.ENDRE_SLUTTDATO:
			return <MinusCircleFilled className={styles.avsluttIkon} aria-hidden/>
	}
}
