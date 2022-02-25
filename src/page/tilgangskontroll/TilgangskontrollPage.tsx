import { Alert, Loader } from '@navikt/ds-react'
import React from 'react'

import { hentAlleAnsatte } from '../../api/api'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { MAIN_PAGE_ROUTE } from '../../navigation'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { AnsattTabell } from './ansatt-tabell/AnasttListe'
import { LeggTilAnsatt } from './legg-til-ansat/LeggTilAnsatt'
import globalStyles from '../../globals.module.scss'
import styles from './TilgangskontrollPage.module.scss'

export const TilgangskontrollPage = (): React.ReactElement => {
	const hentAlleAnsattePromise = usePromise(hentAlleAnsatte)

	if (isNotStartedOrPending(hentAlleAnsattePromise)) {
		return <Loader size="large"/>
	}

	if (isRejected(hentAlleAnsattePromise)) {
		return <Alert variant="error">Klarte ikke å hente ansatte</Alert>
	}

	const ansatte = hentAlleAnsattePromise.result.data

	return (
		<main className={styles.tilgangskontrollPage}>
			<Tilbakelenke to={MAIN_PAGE_ROUTE} className={globalStyles.blokkL} />

			<section className={globalStyles.blokkL}>
				<LeggTilAnsatt onNyAnsattLagtTil={() => hentAlleAnsattePromise.setPromise(hentAlleAnsatte())}/>
			</section>

			<section>
				<AnsattTabell ansatte={ansatte}/>
			</section>
		</main>
	)
}