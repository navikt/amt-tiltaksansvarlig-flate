import { Alert, Heading, Loader } from '@navikt/ds-react'
import React from 'react'

import { fetchGjennomforinger, hentGjennomforingMedLopenr } from '../../api/api'
import { Spinner } from '../../component/spinner/Spinner'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import globalStyles from '../../globals.module.scss'
import { DeferredFetchState, useDeferredFetch } from '../../hooks/useDeferredFetch'
import useFetch from '../../hooks/useFetch'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { GjennomforingPanelListe } from './GjennomforingPanelListe'
import styles from './LeggTilGjennomforingTilgangPage.module.scss'
import { LopenummerPicker } from './LopenummerPicker'

export const LeggTilGjennomforingTilgangPage = (): React.ReactElement => {

	const {
		data: sokteGjennomforinger,
		state: sokteGjennomforingerState,
		doFetch: fetchSokteGjennomforinger
	} = useDeferredFetch(hentGjennomforingMedLopenr)

	const {
		data: mineGjennomforinger,
		loading: mineGjennomforingerLoading,
		error: mineGjennomforingerError
	} = useFetch(fetchGjennomforinger)

	if (mineGjennomforingerLoading) return <Loader/>

	if (mineGjennomforingerError || !mineGjennomforinger) return <Alert variant="error">Noe gikk galt</Alert>

	const mineGjennomforingIds = mineGjennomforinger.map(i => i.id) ?? []

	const setTiltaksnummer = (tiltaksnummer: number) => {
		fetchSokteGjennomforinger(tiltaksnummer)
	}

	return (
		<main className={styles.mainPage} data-testid="legg-til-gjennomforing-page">
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading size="medium" level="1" className={globalStyles.blokkM}>
				Legg til et tiltak du jobber med
			</Heading>

			<LopenummerPicker
				isLoading={sokteGjennomforingerState === DeferredFetchState.LOADING}
				onSokClicked={setTiltaksnummer}/>

			{sokteGjennomforingerState === DeferredFetchState.LOADING && (<Spinner/>)}

			{sokteGjennomforingerState === DeferredFetchState.ERROR && (
				<Alert variant="error">En feil har oppstått</Alert>
			)}

			{sokteGjennomforingerState === DeferredFetchState.RESOLVED && (
				<GjennomforingPanelListe gjennomforinger={sokteGjennomforinger ?? []}
					mineGjennomforingerIds={mineGjennomforingIds}
				/>)}
		</main>
	)
}
