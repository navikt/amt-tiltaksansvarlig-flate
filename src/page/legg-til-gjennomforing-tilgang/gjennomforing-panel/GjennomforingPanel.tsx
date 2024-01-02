import { PlusIcon } from '@navikt/aksel-icons'
import { Alert, BodyShort, Button, Heading, Panel, Tag } from '@navikt/ds-react'
import React from 'react'

import { HentGjennomforingMedLopenr, leggTilTilgangTilGjennomforing } from '../../../api/api'
import { GjennomforingStatus } from '../../../api/schema/schema'
import { DeferredFetchState, useDeferredFetch } from '../../../hooks/useDeferredFetch'
import { formatDate } from '../../../utils/date-utils'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforing: HentGjennomforingMedLopenr,
	alleredeIMineGjennomforinger: boolean
}

export const GjennomforingPanel = (props: GjennomforingPanelProps): React.ReactElement => {
	const { id, navn, opprettetAr, lopenr, status, startDato, sluttDato, arrangorNavn, tiltak } = props.gjennomforing

	const { state, doFetch } = useDeferredFetch(leggTilTilgangTilGjennomforing, id)

	const handleOnLeggTilClicked = () => { doFetch() }

	const LeggTil = () => {
		if (props.alleredeIMineGjennomforinger) {
			return <Alert variant="info" size="small">
				Allerede i min oversikt
			</Alert>
		}

		if(state === DeferredFetchState.RESOLVED) {
			return <Alert variant="success" size="small">Lagt til i min oversikt</Alert>
		}

		return (
			<Button
				variant="secondary"
				onClick={handleOnLeggTilClicked}
				loading={state === DeferredFetchState.LOADING}
				disabled={state !== DeferredFetchState.NOT_STARTED}
				size="small"
				className={styles.leggTilKnapp}
			>
				<PlusIcon /> Legg til
			</Button>
		)
	}


	return (
		<Panel border className={styles.panel}>
			<Heading size="small" level="2" spacing>{navn}</Heading>
			<div className={styles.innhold}>
				<div>
					<BodyShort size="small" className={styles.bodyShort}>Tiltak: {opprettetAr}/{lopenr}</BodyShort>
					<BodyShort size="small" className={styles.bodyShort}>{tiltak.navn}</BodyShort>
					<BodyShort size="small" className={styles.bodyShort}>Tiltaksarrangør: {arrangorNavn}</BodyShort>
					{status === GjennomforingStatus.AVSLUTTET &&
						<BodyShort size="small" className={styles.bodyShort}>
							<Tag variant="warning" size="small" className={styles.tag}>Avsluttet</Tag>
							{formatDate(startDato)} - {formatDate(sluttDato)}
						</BodyShort>
					}
				</div>
				<LeggTil />
			</div>
			{
				state === DeferredFetchState.ERROR
				&& (<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>)
			}
		</Panel>
	)
}
