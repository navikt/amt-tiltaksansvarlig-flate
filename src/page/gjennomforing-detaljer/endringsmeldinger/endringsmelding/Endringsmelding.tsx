import React, { useEffect } from 'react'
import { Alert, BodyShort, Button, Detail, Heading, Panel } from '@navikt/ds-react'
import styles from './Endringsmelding.module.scss'
import { EndringsmeldingType, markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { formatDate } from '../../../../utils/date-utils'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { PanelLinje } from './PanelLinje'
import classNames from 'classnames'

interface EndringsmeldingProps {
	endringsmelding: EndringsmeldingType
	onFerdig: () => void
	children?: React.ReactNode
	className?: string
}

export const Endringsmelding = ({ endringsmelding, onFerdig, children, className }: EndringsmeldingProps): React.ReactElement => {
	const markerSomFerdigPromise = usePromise<AxiosResponse>()

	const bruker = endringsmelding.bruker
	const navn = lagKommaSeparertBrukerNavn(bruker.fornavn, bruker.mellomnavn, bruker.etternavn)

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
		<Panel className={classNames(styles.panel, className)}>
			<PanelLinje>
				<Heading size="xsmall" level="3">{navn}</Heading>
				<BodyShort size="medium" className={styles.fnr} >{bruker.fodselsnummer}</BodyShort>
				<Detail size="small" className={classNames(styles.moveRight, styles.gray)}>Sendt: {formatDate(endringsmelding.opprettetDato)}</Detail>
			</PanelLinje>

			<div className={styles.body}>
				{children}
				{endringsmelding.aktiv
					? (
						<Button
							size="small"
							className={styles.moveRight}
							onClick={handleOnFerdigClicked}
							disabled={!isNotStarted(markerSomFerdigPromise)}
							loading={isPending(markerSomFerdigPromise)}
						>
							Ferdig
						</Button>
					)
					: (
						<BodyShort className={classNames(styles.moveRight, styles.gray)}>Ferdig</BodyShort>
					)
				}


				{(!endringsmelding.godkjent && !endringsmelding.aktiv) &&
					<PanelLinje className={styles.spaceTop}>
						<BodyShort className={styles.smallText}>Ble automatisk flyttet fordi det kom en ny melding.</BodyShort>
					</PanelLinje>
				}

				{isRejected(markerSomFerdigPromise) &&
					<PanelLinje className={styles.spaceTop}>
						<Alert variant="error" size="small">Noe gikk galt</Alert>
					</PanelLinje>
				}
			</div>
		</Panel>
	)
}
