import {
	CheckmarkCircleFillIcon,
	ChevronRightCircleFillIcon,
	ChevronRightDoubleCircleFillIcon,
	MenuElipsisHorizontalCircleFillIcon,
	MinusCircleFillIcon,
	PieChartFillIcon,
	PlusCircleFillIcon } from '@navikt/aksel-icons'
import React from 'react'

import { EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import styles from './EndringsmeldingIkon.module.scss'

interface Props {
	type: EndringsmeldingType
}

export const EndringsmeldingIkon = ({ type }: Props): React.ReactElement => {
	switch (type) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO:
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO:
			return <ChevronRightCircleFillIcon className={styles.endreIkon} aria-hidden/>
		case  EndringsmeldingType.FORLENG_DELTAKELSE:
			return <ChevronRightDoubleCircleFillIcon className={styles.forlengIkon} aria-hidden/>
		case EndringsmeldingType.AVSLUTT_DELTAKELSE:
		case EndringsmeldingType.ENDRE_SLUTTDATO:
			return <MinusCircleFillIcon className={styles.avsluttIkon} aria-hidden/>
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT:
			return <PieChartFillIcon className={styles.endreProsentDeltakelseIkon} aria-hidden/>
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL:
			return <PlusCircleFillIcon className={styles.ikkeAktuellIkon} aria-hidden/>
		case EndringsmeldingType.TILBY_PLASS:
			return <CheckmarkCircleFillIcon className={styles.tilbyPlassIkon} aria-hidden />
		case EndringsmeldingType.SETT_PAA_VENTELISTE:
			return <MenuElipsisHorizontalCircleFillIcon className={styles.settPaaVentelisteIkon} aria-hidden />
	}
}
