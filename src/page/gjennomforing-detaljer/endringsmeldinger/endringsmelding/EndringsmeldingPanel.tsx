import React, { useEffect } from 'react'
import { Alert, BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react'
import styles from './Endringsmelding.module.scss'
import { markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { formatDate } from '../../../../utils/date-utils'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { PanelLinje } from './PanelLinje'
import classNames from 'classnames'
import { Endringsmelding, EndringsmeldingStatus, EndringsmeldingType } from '../../../../api/schema/endringsmelding'
import { EndringsmeldingIkon } from './EndringsmeldingIkon'
import { EndringsmeldingInnhold } from './innhold/EndringsmeldingInnhold'
import { VarighetValg } from './VarighetSelect'


interface EndringsmeldingProps {
	endringsmelding: Endringsmelding
	onFerdig: () => void
	varighetValg: VarighetValg
	className?: string
}

export const EndringsmeldingPanel = ({ endringsmelding, onFerdig, varighetValg, className }: EndringsmeldingProps): React.ReactElement => {
	const markerSomFerdigPromise = usePromise<AxiosResponse>()

	const deltaker = endringsmelding.deltaker
	const navn = lagKommaSeparertBrukerNavn(deltaker.fornavn, deltaker.mellomnavn, deltaker.etternavn)

	const handleOnFerdigClicked = () => {
		markerSomFerdigPromise.setPromise(markerEndringsmeldingSomFerdig(endringsmelding.id))
	}

	useEffect(() => {
		if (isResolved(markerSomFerdigPromise)) {
			onFerdig()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ markerSomFerdigPromise ])

	return (
		<Panel border className={classNames(styles.panel, className)}>
			<div className={styles.ikonRow}>
				<EndringsmeldingIkon type={endringsmelding.type} />
			</div>
			<div className={styles.meldingRow}>
				<PanelLinje>
					<Heading size="xsmall" level="3">{navn}</Heading>
					<BodyShort size="medium" className={styles.fnr} >{deltaker.fodselsnummer}</BodyShort>
					<Detail size="small" className={styles.sendt}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
				</PanelLinje>
				<div className={styles.body}>
					<div>
						<PanelLinje className={styles.spaceTop}>
							<BodyShort size="small" className={styles.bold}>{formatEndringsmeldingType(endringsmelding.type)}</BodyShort>
						</PanelLinje>
						<EndringsmeldingInnhold endringsmelding={endringsmelding} varighetValg={varighetValg} />
						{endringsmelding.status === EndringsmeldingStatus.UTDATERT &&
							<PanelLinje>
								<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi det kom en ny melding.</BodyShort>
							</PanelLinje>
						}
						{endringsmelding.status === EndringsmeldingStatus.TILBAKEKALT &&
							<PanelLinje>
								<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi arrangør har tilbakekalt meldingen.</BodyShort>
							</PanelLinje>
						}
					</div>
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

				{isRejected(markerSomFerdigPromise) &&
					<PanelLinje className={styles.spaceTop}>
						<Alert variant="error" size="small">Noe gikk galt</Alert>
					</PanelLinje>
				}
			</div>
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
