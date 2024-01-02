import { Alert, BodyShort, Detail, Heading, Panel, Tag } from '@navikt/ds-react'
import React from 'react'

import { markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { Endringsmelding, EndringsmeldingStatus, EndringsmeldingType } from '../../../../api/schema/meldinger'
import { PanelLinje } from '../../../../component/message-panel/PanelLinje'
import { DeferredFetchState, useDeferredFetch } from '../../../../hooks/useDeferredFetch'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingIkon } from './EndringsmeldingIkon'
import { FerdigKnapp } from './Ferdigknapp'
import { EndringsmeldingInnhold } from './innhold/EndringsmeldingInnhold'
import { VarighetValg } from './VarighetSelect'


interface EndringsmeldingProps {
	endringsmelding: Endringsmelding
	onFerdig: () => void
	varighetValg: VarighetValg
}

export const EndringsmeldingPanel = ({ endringsmelding, onFerdig, varighetValg }: EndringsmeldingProps): React.ReactElement => {
	const { state, doFetch } = useDeferredFetch(markerEndringsmeldingSomFerdig, endringsmelding.id)

	const deltaker = endringsmelding.deltaker
	const erSkjermet = deltaker.erSkjermet
	const kanArkiveres = deltaker.fornavn && deltaker.etternavn && deltaker.fodselsnummer
	const navn = deltaker.fornavn && deltaker.etternavn ? lagKommaSeparertBrukerNavn(deltaker.fornavn, deltaker.mellomnavn, deltaker.etternavn) : ''

	const onFerdigKlikk = () => {
		doFetch().then(() => onFerdig())
	}

	return (
		<Panel border className={styles.panel}>
			<div className={styles.ikonColumn}>
				<EndringsmeldingIkon type={endringsmelding.type}/>
			</div>

			<div className={styles.meldingInnholdColumn}>
				{erSkjermet && <Tag size="small" variant="warning" style={{ marginBottom: '0.7rem' }}>Skjermet</Tag>}
				<PanelLinje className={styles.spaceBottom}>
					<Heading size="xsmall" level="3">{navn}</Heading>
					<BodyShort size="medium" className={styles.fnr}>{deltaker.fodselsnummer}</BodyShort>
				</PanelLinje>
				<BodyShort size="small"
					className={styles.endringstype}>{formatEndringsmeldingType(endringsmelding.type)}</BodyShort>
				<EndringsmeldingInnhold endringsmelding={endringsmelding} varighetValg={varighetValg}/>

				{endringsmelding.status === EndringsmeldingStatus.UTDATERT &&
					<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi det kom en ny
						melding.</BodyShort>
				}

				{endringsmelding.status === EndringsmeldingStatus.TILBAKEKALT &&
					<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi arrangør har tilbakekalt
						meldingen.</BodyShort>
				}

			</div>
			<div className={styles.rightColumn}>
				<Detail className={styles.sendt}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
				<FerdigKnapp
					inaktiv={endringsmelding.status !== EndringsmeldingStatus.AKTIV}
					skalSkjules={!kanArkiveres}
					onClick={onFerdigKlikk}
					disabled={state !== DeferredFetchState.NOT_STARTED}
					loading={state === DeferredFetchState.LOADING}
				/>
			</div>

			{state === DeferredFetchState.ERROR &&
				<Alert variant="error" size="small" className={styles.spaceTop}>Noe gikk galt</Alert>}
		</Panel>
	)
}

const formatEndringsmeldingType = (meldingType: EndringsmeldingType) => {
	switch (meldingType) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO: return 'Legg til oppstartsdato'
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO: return 'Endre oppstartsdato'
		case EndringsmeldingType.FORLENG_DELTAKELSE: return 'Forleng deltakelse'
		case EndringsmeldingType.AVSLUTT_DELTAKELSE: return 'Avslutt deltakelse'
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL: return 'Personen er ikke aktuell'
		case EndringsmeldingType.ENDRE_SLUTTDATO: return 'Endre sluttdato'
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT: return 'Endre deltakelsesmengde'
		case EndringsmeldingType.ENDRE_SLUTTAARSAK: return 'Endre sluttårsak'

	}
}
