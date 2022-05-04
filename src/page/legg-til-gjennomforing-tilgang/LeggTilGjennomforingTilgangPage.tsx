import React, { useState } from 'react'

import styles from './LeggTilGjennomforingTilgangPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Alert, Button, Heading, TextField } from '@navikt/ds-react'
import { isPending, isRejected, isResolved, usePromise } from '../../utils/use-promise'
import { AxiosResponse } from 'axios'
import {
	HentGjennomforingerMedLopenrType,
	hentGjennomforingMedLopenr
} from '../../api/api'
import { Spinner } from '../../component/spinner/Spinner'
import { GjennomforingPanelListe } from './GjennomforingPanelListe'

const kunSiffer = (value: string): boolean => {
	return !!value.match('^[0-9]+$')
}

export const LeggTilGjennomforingTilgangPage = (): React.ReactElement => {
	const [ lopenrSokefelt, setLopenrSokefelt ] = useState<string>('')
	const hentGjennomforingMedLopenrPromise = usePromise<AxiosResponse<HentGjennomforingerMedLopenrType>>()

	const handleOnSokClicked = () => {
		const lopenr = parseInt(lopenrSokefelt)
		hentGjennomforingMedLopenrPromise.setPromise(() => hentGjennomforingMedLopenr(lopenr))
	}

	const sokteGjennomforinger = hentGjennomforingMedLopenrPromise.result?.data ?? []

	return (
		<main className={styles.mainPage}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkS}/>

			<Heading size="large" level="1" className={globalStyles.blokkM}>
				Legg til et tiltak du jobber med
			</Heading>

			<div className={styles.sok}>
				<TextField
					label="Tiltaksnummer"
					placeholder="Tiltaksnummer (løpenummer)"
					value={lopenrSokefelt}
					onChange={e => {
						const value = e.target.value

						if (kunSiffer(value) || value === '')
							setLopenrSokefelt(value)
					}}
				/>
				<Button variant="primary" onClick={handleOnSokClicked}>Søk</Button>
			</div>

			{
				isPending(hentGjennomforingMedLopenrPromise)
				&& (<Spinner/>)
			}

			{
				isRejected(hentGjennomforingMedLopenrPromise)
				&& (<Alert variant="error">En feil har oppstått</Alert>)
			}

			{
				isResolved(hentGjennomforingMedLopenrPromise)
				&& (<GjennomforingPanelListe gjennomforinger={sokteGjennomforinger}/>)
			}
		</main>
	)
}