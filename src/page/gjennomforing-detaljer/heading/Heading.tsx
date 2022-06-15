import styles from './Heading.module.scss'
import { Show } from '../../../component/Show'
import {
	isFinished,
	isNotStartedOrPending,
	isPending,
	isRejected,
	isResolved,
	usePromise
} from '../../../utils/use-promise'
import { Alert, Button, Heading as NavHeading } from '@navikt/ds-react'
import globalStyles from '../../../globals.module.scss'
import React from 'react'
import { AxiosResponse } from 'axios'
import { fjernGjennomforingFraOversikten } from '../../../api/api'

interface HeadingProps {
	gjennomforingNavn: string,
	gjennomforingId: string
}

export const Heading = (props: HeadingProps) => {
	const fjernFraOversiktenPromise = usePromise<AxiosResponse>()

	const handleFjernFraMinOversikt = () => {
		fjernFraOversiktenPromise.setPromise(() => fjernGjennomforingFraOversikten(props.gjennomforingId))
	}

	return (
		<div className={styles.heading}>
			<NavHeading size="medium" spacing>{props.gjennomforingNavn}</NavHeading>

			<Show if={isNotStartedOrPending(fjernFraOversiktenPromise)}>
				<Button
					variant="secondary"
					size="small"
					onClick={handleFjernFraMinOversikt}
					className={globalStyles.blokkXs}
					loading={isPending(fjernFraOversiktenPromise)}
					disabled={isPending(fjernFraOversiktenPromise) || isResolved(fjernFraOversiktenPromise)}
				>
					Fjern fra min oversikt
				</Button>
			</Show>

			<Show if={isFinished(fjernFraOversiktenPromise)}>
				{
					isResolved(fjernFraOversiktenPromise) &&
					(<Alert variant="success" size="small" className={styles.alert}>Tiltaket er fjernet fra oversikten</Alert>)
				}

				{
					isRejected(fjernFraOversiktenPromise) &&
					(<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>)
				}
			</Show>
		</div>
	)
}