import { Alert, BodyShort, Button, Detail, Heading, Panel, Tag } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React, { useEffect } from 'react'

import { markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { Endringsmelding, EndringsmeldingStatus, EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingIkon } from './EndringsmeldingIkon'
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
	const erSkjermet = endringsmelding.deltaker.erSkjermet
	const deltaker = endringsmelding.deltaker
	const navn = deltaker.fornavn && deltaker.etternavn? lagKommaSeparertBrukerNavn(deltaker.fornavn, deltaker.mellomnavn, deltaker.etternavn): ''

	const handleOnFerdigClicked = () => {
		markerSomFerdigPromise.setPromise(markerEndringsmeldingSomFerdig(endringsmelding.id))
	}

	useEffect(() => {
		if (isResolved(markerSomFerdigPromise)) {
			onFerdig()
		}
	}, [ markerSomFerdigPromise, onFerdig ])

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
				{endringsmelding.status === EndringsmeldingStatus.AKTIV
					? (
						<Button
							size="small"
							onClick={handleOnFerdigClicked}
							disabled={!isNotStarted(markerSomFerdigPromise)}
							loading={isPending(markerSomFerdigPromise)}
						>
							Ferdig
						</Button>
					)
					: (
						<BodyShort className={styles.gray}>Ferdig</BodyShort>
					)
				}
			</div>

			{ isRejected(markerSomFerdigPromise) && <Alert variant="error" size="small" className={styles.spaceTop}>Noe gikk galt</Alert> }
		</Panel>
	)
}

const formatEndringsmeldingType = (meldingType: EndringsmeldingType): string => {
	switch (meldingType) {
		case EndringsmeldingType.LEGG_TIL_OPPSTARTSDATO: return 'Legg til oppstartsdato'
		case EndringsmeldingType.ENDRE_OPPSTARTSDATO: return 'Endre oppstartsdato'
		case EndringsmeldingType.FORLENG_DELTAKELSE: return 'Forleng deltakelse'
		case EndringsmeldingType.AVSLUTT_DELTAKELSE: return 'Avslutt deltakelse'
		case EndringsmeldingType.DELTAKER_IKKE_AKTUELL: return 'Deltaker er ikke aktuell'
		case EndringsmeldingType.ENDRE_DELTAKELSE_PROSENT: return 'Endre deltakelsesprosent'
	}
}
