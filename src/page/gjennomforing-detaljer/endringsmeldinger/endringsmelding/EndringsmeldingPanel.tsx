import React, { useEffect } from 'react'
import { Alert, BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react'
import styles from './Endringsmelding.module.scss'
import { Endringsmelding, markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { formatDate } from '../../../../utils/date-utils'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { PanelLinje } from './PanelLinje'
import classNames from 'classnames'
import { EndringsmeldingStatus } from '../../../../api/schema/endringsmelding'


interface EndringsmeldingProps {
	endringsmelding: Endringsmelding
	onFerdig: () => void
	children?: React.ReactNode
	className?: string
}

export const EndringsmeldingPanel = ({ endringsmelding, onFerdig, children, className }: EndringsmeldingProps): React.ReactElement => {
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
			<PanelLinje>
				<Heading size="xsmall" level="4">{navn}</Heading>
				<BodyShort size="medium" className={styles.fnr} >{deltaker.fodselsnummer}</BodyShort>
				<Detail size="small" className={styles.sendt}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
			</PanelLinje>

			<div className={styles.body}>
				{children}
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

			{endringsmelding.status === EndringsmeldingStatus.UTDATERT &&
				<PanelLinje className={styles.spaceTop}>
					<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi det kom en ny melding.</BodyShort>
				</PanelLinje>
			}

			{isRejected(markerSomFerdigPromise) &&
				<PanelLinje className={styles.spaceTop}>
					<Alert variant="error" size="small">Noe gikk galt</Alert>
				</PanelLinje>
			}
		</Panel>
	)
}
