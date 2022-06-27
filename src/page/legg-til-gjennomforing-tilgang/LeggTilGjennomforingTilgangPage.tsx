import React, { useState } from 'react'

import styles from './LeggTilGjennomforingTilgangPage.module.scss'
import globalStyles from '../../globals.module.scss'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import { FORSIDE_PAGE_ROUTE } from '../../navigation'
import { Alert, Button, Heading, TextField } from '@navikt/ds-react'
import { isPending, isRejected, isResolved, usePromise } from '../../utils/use-promise'
import { AxiosResponse } from 'axios'
import {
	fetchGjennomforinger,
	GjennomforingerType,
	HentGjennomforingerMedLopenrType,
	hentGjennomforingMedLopenr
} from '../../api/api'
import { Spinner } from '../../component/spinner/Spinner'
import { GjennomforingPanelListe } from './GjennomforingPanelListe'

export const LeggTilGjennomforingTilgangPage = (): React.ReactElement => {
	const [ lopenrSokefelt, setLopenrSokefelt ] = useState<string>('')
	const hentGjennomforingMedLopenrPromise = usePromise<AxiosResponse<HentGjennomforingerMedLopenrType>>()

	const getMineGjennomforinger = usePromise<AxiosResponse<GjennomforingerType>>(fetchGjennomforinger)

	const mineGjennomforinger = getMineGjennomforinger.result?.data
		.map(i => i.id)
		?? []

	const handleOnSokClicked = () => {
		const lopenr = parseInt(lopenrSokefelt)
		hentGjennomforingMedLopenrPromise.setPromise(() => hentGjennomforingMedLopenr(lopenr))
	}

	const sokteGjennomforinger = hentGjennomforingMedLopenrPromise.result?.data ?? []

	const kunSiffer = (value: string): boolean => {
		return !!value.match('^[0-9]+$')
	}

	const isValidLopenr = (value: string): boolean => {
		return (kunSiffer(value) && value.length <= 7) || value === ''
	}

	return (
		<main className={styles.mainPage}>
			<Tilbakelenke to={FORSIDE_PAGE_ROUTE} className={globalStyles.blokkM}/>

			<Heading size="medium" level="1" className={globalStyles.blokkM}>
				Legg til et tiltak du jobber med
			</Heading>

			<div className={styles.sok}>
				<TextField
					label="Tiltaksnummer"
					value={lopenrSokefelt}
					onKeyDown={e => e.key === 'Enter' && handleOnSokClicked()}
					onChange={e => {
						const value = e.target.value

						if (isValidLopenr(value))
							setLopenrSokefelt(value)
					}}
				/>

				<Button
					variant="primary"
					className={styles.leggTilKnapp}
					onClick={handleOnSokClicked}
					disabled={isPending(hentGjennomforingMedLopenrPromise) || !lopenrSokefelt}
					loading={isPending(hentGjennomforingMedLopenrPromise)}
				>
					Søk
				</Button>
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
				&& (<GjennomforingPanelListe gjennomforinger={sokteGjennomforinger} mineGjennomforingerIds={mineGjennomforinger}/>)
			}
		</main>
	)
}
