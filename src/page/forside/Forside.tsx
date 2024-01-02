import { PlusIcon } from '@navikt/aksel-icons'
import { Alert, Heading, Loader } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { fetchGjennomforinger } from '../../api/api'
import globalStyles from '../../globals.module.scss'
import useFetch from '../../hooks/useFetch'
import { LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE } from '../../navigation'
import styles from './Forside.module.scss'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'

export const Forside = (): React.ReactElement => {
	const {
		data: gjennomforinger,
		loading,
		error
	} = useFetch(fetchGjennomforinger)

	if (loading) return <Loader/>

	if (error || !gjennomforinger) return <Alert variant="error">Noe gikk galt</Alert>

	return (
		<main className={styles.mainPage} data-testid="forside-page">
			<div className={cls(styles.header, globalStyles.blokkM)}>
				<Heading size="medium">Min tiltaksoversikt</Heading>
				<Link to={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE} className="navds-link"
					data-testid="legg-til-gjennomforing-link">
					<PlusIcon aria-labelledby="legg-til"/>
					<span id="legg-til">Legg til</span>
				</Link>
			</div>
			<GjennomforingListe gjennomforinger={gjennomforinger}/>
		</main>
	)
}
