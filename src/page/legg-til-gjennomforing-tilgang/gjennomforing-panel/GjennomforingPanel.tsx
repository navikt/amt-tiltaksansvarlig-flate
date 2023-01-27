import { Add } from '@navikt/ds-icons'
import { Alert, BodyShort, Button, Heading, Panel, Tag } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { HentGjennomforingMedLopenr, leggTilTilgangTilGjennomforing } from '../../../api/api'
import { GjennomforingStatus } from '../../../api/schema/schema'
import { formatDate } from '../../../utils/date-utils'
import { isNotStarted, isPending, isRejected, usePromise } from '../../../utils/use-promise'
import styles from './GjennomforingPanel.module.scss'

interface GjennomforingPanelProps {
	gjennomforing: HentGjennomforingMedLopenr,
	alleredeIMineGjennomforinger: boolean
}

export const GjennomforingPanel = (props: GjennomforingPanelProps): React.ReactElement => {
	const { id, navn, opprettetAr, lopenr, status, startDato, sluttDato, arrangorNavn, tiltak } = props.gjennomforing
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
				size="small"
				className={styles.leggTilKnapp}
			>
				<Add /> Legg til
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
				isRejected(leggTilGjennomforingPromise)
				&& (<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>)
			}
		</Panel>
	)
}
