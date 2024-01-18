import { Alert, Button, Heading as NavHeading } from '@navikt/ds-react'
import classNames from 'classnames'
import React from 'react'

import { fjernGjennomforingFraOversikten } from '../../../api/api'
import globalStyles from '../../../globals.module.scss'
import { DeferredFetchState, useDeferredFetch } from '../../../hooks/useDeferredFetch'
import styles from './Heading.module.scss'

interface HeadingProps {
    gjennomforingNavn: string,
    gjennomforingId: string
}

export const Heading = (props: HeadingProps) => {

	const { state, doFetch } = useDeferredFetch(fjernGjennomforingFraOversikten)

	const handleFjernFraMinOversikt = () => { doFetch(props.gjennomforingId) }

	return (
		<div className={styles.heading}>
			<NavHeading size="medium">{props.gjennomforingNavn}</NavHeading>

			{(state === DeferredFetchState.NOT_STARTED || state === DeferredFetchState.LOADING) && (
				<Button
					variant="secondary"
					size="small"
					onClick={handleFjernFraMinOversikt}
					className={classNames(styles.fjernKnapp, globalStyles.blokkXs)}
					loading={state === DeferredFetchState.LOADING}
					disabled={state === DeferredFetchState.LOADING}
				>
					Fjern fra min oversikt
				</Button>

			)}

			{state === DeferredFetchState.RESOLVED && (
				<Alert variant="success" size="small" className={styles.alert}>Fjernet fra min oversikt</Alert>
			)}

			{state === DeferredFetchState.ERROR && (
				<Alert variant="error" size="small" className={styles.alert}>Noe gikk galt</Alert>
			)}
		</div>
	)
}
