import { BodyShort, Button, TextField } from '@navikt/ds-react'
import React, { useState } from 'react'
import globalStyles from '../../../globals.module.scss'
import styles from './LeggTilAnsatt.module.scss'
import cls from 'classnames';
import { sokEtterPerson } from '../../../api/api';
import { PersonInfo } from '../../../api/data/person-info';
import { Show } from '../../../component/Show';

interface LeggTilAnsattProps {
	onNyAnsattLagtTil: () => void
}

export const LeggTilAnsatt = (props: LeggTilAnsattProps): React.ReactElement => {
	const [ ansattFnr, setAnsattFnr ] = useState('')
	const [ personInfo, setPersonInfo ] = useState<PersonInfo>()

	const handleOnLeggTilAnsattClicked = () => {
		props.onNyAnsattLagtTil()
	}

	const handleOnSokClicked = () => {
		sokEtterPerson(ansattFnr)
			.then(res => setPersonInfo(res.data))
	}

	return (
		<div className={styles.leggTilAnsatt}>
			<div className={cls(styles.sokSeksjon, globalStyles.blokkS)}>
				<TextField
					label="Tiltaksarrangør ansatt fødselsnummer"
					value={ansattFnr}
					onChange={e => setAnsattFnr(e.target.value)}
				/>

				<Button variant="primary" onClick={handleOnSokClicked}>Søk</Button>
			</div>

			<Show if={personInfo}>
				<div className={styles.leggTilSeksjon}>
					<BodyShort>{personInfo?.etternavn}, {personInfo?.fornavn}</BodyShort>

					<Button variant="primary" onClick={handleOnLeggTilAnsattClicked}>
						Legg til tiltaksarrangør ansatt
					</Button>
				</div>
			</Show>
		</div>
	)
}