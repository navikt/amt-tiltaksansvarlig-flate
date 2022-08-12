import React from 'react'

import globalStyles from '../../globals.module.scss'
import styles from './Forside.module.scss'
import { AxiosResponse } from 'axios'
import { Alert, Heading, Loader } from '@navikt/ds-react'
import { GjennomforingPanel } from './gjennomforing-panel/GjennomforingPanel'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { fetchGjennomforinger, GjennomforingerType } from '../../api/api'
import { Add } from '@navikt/ds-icons'
import cls from 'classnames'
import { LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE } from '../../navigation'
import { Link } from 'react-router-dom'
import { TomVisningPanel } from './tom-visning-panel/TomVisningPanel'

export const Forside = (): React.ReactElement => {
	const getGjennomforinger = usePromise<AxiosResponse<GjennomforingerType>>(fetchGjennomforinger)

	if (isNotStartedOrPending(getGjennomforinger)) return <Loader />

	if (isRejected(getGjennomforinger)) return <Alert variant="error">Noe gikk galt</Alert>

	const gjennomforinger = getGjennomforinger.result.data

	return (
		<main className={styles.mainPage} data-testid="forside-page">
			<div className={cls(styles.header, globalStyles.blokkM)}>
				<Heading size="medium">Min tiltaksoversikt</Heading>
				<Link to={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE} className="navds-link" data-testid="legg-til-gjennomforing-link">
					<Add aria-labelledby="legg-til"/>
					<span id="legg-til">Legg til</span>
				</Link>
			</div>

			{ gjennomforinger.length === 0
				? (<TomVisningPanel/>)
				: (gjennomforinger.map(gjennomforing => <GjennomforingPanel gjennomforing={gjennomforing} key={gjennomforing.id}/>))
			}
		</main>
	)
}