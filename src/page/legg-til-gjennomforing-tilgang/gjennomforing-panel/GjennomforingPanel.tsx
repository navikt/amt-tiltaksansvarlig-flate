import React from 'react'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import {
	HentGjennomforingMedLopenrType,
	leggTilTilgangTilGjennomforing
} from '../../../api/api'
import { Add } from '@navikt/ds-icons'
import styles from './GjennomforingPanel.module.scss'
import { isNotStarted, isPending, isRejected, isResolved, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'

interface GjennomforingPanelProps {
	gjennomforing: HentGjennomforingMedLopenrType
}

export const GjennomforingPanel = (props: GjennomforingPanelProps): React.ReactElement => {
	const { id, navn, opprettetAr, lopenr, arrangorNavn } = props.gjennomforing

	const leggTilGjennomforingPromise = usePromise<AxiosResponse>()

	const handleOnLeggTilClicked = () => {
		leggTilGjennomforingPromise.setPromise(() => leggTilTilgangTilGjennomforing(id))
	}

	const disableLeggTil = !isNotStarted(leggTilGjennomforingPromise)

	return (
		<Panel border>
			<Heading size="xsmall" level="3">{navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<BodyShort className={styles.muted}>Tiltak: {opprettetAr}/{lopenr}</BodyShort>
					<BodyShort className={styles.muted}>Oppfølging</BodyShort>
					<BodyShort className={styles.muted}>Tiltaksarrangør: {arrangorNavn}</BodyShort>
				</div>
				<Button
					variant="secondary"
					onClick={handleOnLeggTilClicked}
					loading={isPending(leggTilGjennomforingPromise)}
					disabled={disableLeggTil}
				>
					<Add/> Legg til
				</Button>
			</div>

			{
				isRejected(leggTilGjennomforingPromise)
					&& (<Alert variant="error" className={styles.alert}>Noe gikk galt</Alert>)
			}

			{
				isResolved(leggTilGjennomforingPromise)
					&& (<Alert variant="success" className={styles.alert}>Tiltaket er lagt til i Min Tiltaksoversikt</Alert>)
			}
		</Panel>
	)
}