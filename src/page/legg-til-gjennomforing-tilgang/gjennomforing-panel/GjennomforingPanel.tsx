import React from 'react'
import { Alert, BodyShort, Button, Heading, Panel } from '@navikt/ds-react'
import { HentGjennomforingMedLopenr, leggTilTilgangTilGjennomforing } from '../../../api/api'
import { Add } from '@navikt/ds-icons'
import styles from './GjennomforingPanel.module.scss'
import { isNotStarted, isPending, isRejected, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'

interface GjennomforingPanelProps {
	gjennomforing: HentGjennomforingMedLopenr,
	alleredeIMineGjennomforinger: boolean
}

export const GjennomforingPanel = (props: GjennomforingPanelProps): React.ReactElement => {
	const { id, navn, opprettetAr, lopenr, arrangorNavn, tiltak } = props.gjennomforing
	const leggTilGjennomforingPromise = usePromise<AxiosResponse>()

	const handleOnLeggTilClicked = () => {
		leggTilGjennomforingPromise.setPromise(() => leggTilTilgangTilGjennomforing(id))
	}

	const disableLeggTil = !isNotStarted(leggTilGjennomforingPromise)

	const LeggTil = () => {
		if (props.alleredeIMineGjennomforinger) {
			return <Alert variant="info" size="small">
				Allerede i min oversikt
			</Alert>
		}

		if (disableLeggTil) {
			return <Alert variant="success" size="small">Lagt til i min oversikt</Alert>
		}

		return (
			<Button
				variant="secondary"
				onClick={handleOnLeggTilClicked}
				loading={isPending(leggTilGjennomforingPromise)}
				disabled={disableLeggTil}
				className={styles.leggTilKnapp}
			>
				<Add /> Legg til
			</Button>
		)
	}


	return (
		<Panel border className={styles.panel}>
			<Heading size="xsmall" level="2">{navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<BodyShort className={styles.muted}>Tiltak: {opprettetAr}/{lopenr}</BodyShort>
					<BodyShort className={styles.muted}>{tiltak.navn}</BodyShort>
					<BodyShort className={styles.muted}>Tiltaksarrangør: {arrangorNavn}</BodyShort>
				</div>
				<LeggTil />
			</div>
			{
				isRejected(leggTilGjennomforingPromise)
				&& (<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>)
			}
		</Panel>
	)
}
