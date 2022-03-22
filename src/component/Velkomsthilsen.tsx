import React from 'react'

import navAnsatt from './nav-ansatt.svg'
import { Snakkeboble } from './Snakkeboble'
import styles from './Velkomsthilsen.module.scss'

export const Velkomsthilsen = () : React.ReactElement => {
	return (
		<div className={styles.wrapper}>
			<img src={navAnsatt} alt="mann" className={styles.ikon}/>
			<Snakkeboble tekst="Her kan du se tiltak du har ansvar for."/>
		</div>
	)
}