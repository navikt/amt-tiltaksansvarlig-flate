import { Alert, BodyShort, Detail, Heading, Panel, Tag } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { Endringsmelding, EndringsmeldingStatus, EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingIkon } from './EndringsmeldingIkon'
import { FerdigKnapp } from './Ferdigknapp'
import { EndringsmeldingInnhold } from './innhold/EndringsmeldingInnhold'
import { PanelLinje } from './PanelLinje'
import { VarighetValg } from './VarighetSelect'


interface EndringsmeldingProps {
	endringsmelding: Endringsmelding
	onFerdig: () => void
	varighetValg: VarighetValg
}

export const EndringsmeldingPanel = ({ endringsmelding, onFerdig, varighetValg }: EndringsmeldingProps): React.ReactElement => {
	const markerSomFerdigPromise = usePromise<AxiosResponse>()
	const deltaker = endringsmelding.deltaker
	const erSkjermet = deltaker.erSkjermet
	const kanArkiveres = deltaker.fornavn && deltaker.etternavn && deltaker.fodselsnummer
	const navn = deltaker.fornavn && deltaker.etternavn? lagKommaSeparertBrukerNavn(deltaker.fornavn, deltaker.mellomnavn, deltaker.etternavn): ''

	useEffect(() => {
		if (isResolved(markerSomFerdigPromise)) {
			onFerdig()
		}
	}, [ markerSomFerdigPromise, onFerdig ])

	const onFerdigKlikk = () => {
		markerSomFerdigPromise.setPromise(markerEndringsmeldingSomFerdig(endringsmelding.id))
	}

	return (
		<Panel border className={styles.panel}>
			<div className={styles.ikonColumn}>
				<EndringsmeldingIkon type={endringsmelding.type} />
			</div>

			<div className={styles.meldingInnholdColumn}>
				{ erSkjermet && <Tag size="small" variant="warning" style={{ marginBottom: '0.7rem' }}>Skjermet</Tag> }
				<PanelLinje className={styles.spaceBottom}>
					<Heading size="xsmall" level="3">{navn}</Heading>
					<BodyShort size="medium" className={styles.fnr} >{deltaker.fodselsnummer}</BodyShort>
				</PanelLinje>
				<BodyShort size="small" className={styles.endringstype}>{formatEndringsmeldingType(endringsmelding.type)}</BodyShort>
				<EndringsmeldingInnhold endringsmelding={endringsmelding} varighetValg={varighetValg} />

				{endringsmelding.status === EndringsmeldingStatus.UTDATERT &&
					<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi det kom en ny melding.</BodyShort>
				}

				{endringsmelding.status === EndringsmeldingStatus.TILBAKEKALT &&
					<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi arrangør har tilbakekalt meldingen.</BodyShort>
				}

			</div>
			<div className={styles.rightColumn}>
				<Detail className={styles.sendt}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
				<FerdigKnapp
					inaktiv={endringsmelding.status !== EndringsmeldingStatus.AKTIV}
					skalSkjules={!kanArkiveres}
					onClick={onFerdigKlikk}
					disabled={!isNotStarted(markerSomFerdigPromise)}
					loading={isPending(markerSomFerdigPromise)}
				/>
			</div>

			{ isRejected(markerSomFerdigPromise) && <Alert variant="error" size="small" className={styles.spaceTop}>Noe gikk galt</Alert> }
		</Panel>
	)
}

const formatEndringsmeldingType = (meldingType: EndringsmeldingType) => {
	switch (meldingType) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO: return 'Legg til oppstartsdato'
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO: return 'Endre oppstartsdato'
		case EndringsmeldingType.FORLENG_DELTAKELSE: return 'Forleng deltakelse'
		case EndringsmeldingType.AVSLUTT_DELTAKELSE: return 'Avslutt deltakelse'
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL: return 'Deltaker er ikke aktuell'
		case EndringsmeldingType.TILBY_PLASS: return 'Tilby plass'
		case EndringsmeldingType.SETT_PAA_VENTELISTE: return 'Sett på venteliste'
		case EndringsmeldingType.ENDRE_SLUTTDATO: return 'Endre sluttdato'
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT: return 'Endre deltakelsesmengde'

	}
}
