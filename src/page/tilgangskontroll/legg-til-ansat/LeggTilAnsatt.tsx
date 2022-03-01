import { BodyShort, Button, Loader, TextField } from '@navikt/ds-react'
import cls from 'classnames'
import React, { useState } from 'react'

import { sokEtterPerson } from '../../../api/api'
import { PersonInfo } from '../../../api/data/person-info'
import { Show } from '../../../component/Show'
import globalStyles from '../../../globals.module.scss'
import styles from './LeggTilAnsatt.module.scss'

interface LeggTilAnsattProps {
	onNyAnsattLagtTil: () => void
}

export const LeggTilAnsatt = (props: LeggTilAnsattProps): React.ReactElement => {
	const [ ansattFnr, setAnsattFnr ] = useState('')
	const [ personInfo, setPersonInfo ] = useState<PersonInfo>()
	const [ isSearching, setIsSearching ] = useState(false)

	const handleOnLeggTilAnsattClicked = () => {
		props.onNyAnsattLagtTil()
	}

	const handleOnSokClicked = () => {
		setIsSearching(true)

		sokEtterPerson(ansattFnr)
			.then(res => setPersonInfo(res.data))
			.finally(() => setIsSearching(false))
	}

	return (
		<div className={styles.leggTilAnsatt}>
			<div className={cls(styles.sokSeksjon, globalStyles.blokkS)}>
				<TextField
					label="Tiltaksarrangør ansatt fødselsnummer"
					value={ansattFnr}
					onChange={e => setAnsattFnr(e.target.value)}
					className={styles.fnrField}
				/>

				<div className={styles.sokKnappWrapper}>
					<Button variant="primary" type="button" onClick={handleOnSokClicked} className={styles.sokKnapp}>Søk</Button>
				</div>
			</div>

			<Show if={isSearching}>
				<Loader size="2xlarge"/>
			</Show>

			<Show if={personInfo}>
				<div className={styles.leggTilSeksjon}>
					<BodyShort className={globalStyles.blokkS}>
						<strong>
							{personInfo?.etternavn}, {personInfo?.fornavn}
						</strong>
					</BodyShort>

					<Button variant="primary" type="button" onClick={handleOnLeggTilAnsattClicked}>
						Legg til tiltaksarrangør ansatt
					</Button>
				</div>
			</Show>
		</div>
	)
}