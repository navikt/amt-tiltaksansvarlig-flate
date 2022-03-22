import React from 'react'

import { Gjennomforinger } from '../component/Gjennomforinger'
import { Velkomsthilsen } from '../component/Velkomsthilsen'
import styles from './Forside.module.scss'

export const Forside = (): React.ReactElement => {
	return (
		<main className={styles.mainPage}>
			<Velkomsthilsen />
			<Gjennomforinger/>
		</main>
	)
}