import React from 'react'

import { GjennomforingListe } from '../component/GjennomforingListe'
import { Velkomsthilsen } from '../component/Velkomsthilsen'
import styles from './Forside.module.scss'

export const Forside = (): React.ReactElement => {
	return (
		<main className={styles.mainPage}>
			<Velkomsthilsen />
			<GjennomforingListe/>
		</main>
	)
}