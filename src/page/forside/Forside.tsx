import { PlusIcon } from '@navikt/aksel-icons'
import { Alert, Heading, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { fetchGjennomforinger, Gjennomforing } from '../../api/api'
import globalStyles from '../../globals.module.scss'
import { LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE } from '../../navigation'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import styles from './Forside.module.scss'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'

export const Forside = (): React.ReactElement => {
	const getGjennomforinger = usePromise<AxiosResponse<Gjennomforing[]>>(fetchGjennomforinger)

	if (isNotStartedOrPending(getGjennomforinger)) return <Loader />

	if (isRejected(getGjennomforinger)) return <Alert variant="error">Noe gikk galt</Alert>

	const gjennomforinger = getGjennomforinger.result.data

	return (
		<main className={styles.mainPage} data-testid="forside-page">
			<div className={cls(styles.header, globalStyles.blokkM)}>
				<Heading size="medium">Min tiltaksoversikt</Heading>
				<Link to={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE} className="navds-link" data-testid="legg-til-gjennomforing-link">
					<PlusIcon aria-labelledby="legg-til" />
					<span id="legg-til">Legg til</span>
				</Link>
			</div>
			<GjennomforingListe gjennomforinger={gjennomforinger} />
		</main>
	)
}
