import React from 'react'

import { ChevronRightCircleFilled, ChevronRightDoubleFilled, ErrorFilled, MinusCircleFilled } from '@navikt/ds-icons'
import { EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import styles from './Endringsmelding.module.scss'

interface Props {
	type: EndringsmeldingType
}

export const EndringsmeldingIkon = ({ type }: Props): React.ReactElement => {
	switch (type) {
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO: {
			return <ChevronRightCircleFilled className={styles.oppstartsdatoIkon} />
		}
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO: {
			return <ChevronRightCircleFilled className={styles.oppstartsdatoIkon} />
		}
		case EndringsmeldingType.FORLENG_DELTAKELSE: {
			return <ChevronRightDoubleFilled className={styles.forlengeDeltakelseIkon} />
		}
		case EndringsmeldingType.AVSLUTT_DELTAKELSE: {
			return <MinusCircleFilled className={styles.avsluttDeltakelseIkon} />
		}
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL: {
			return <ErrorFilled className={styles.ikkeAktuellIkon} />
		}
	}
}
