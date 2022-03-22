import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import styles from './Snakkeboble.module.scss'

interface SnakkebobleProps {
	tekst: string
}

export const Snakkeboble = ({ tekst }: SnakkebobleProps) : React.ReactElement => {
	return (
		<div className={styles.boble}>
			<BodyShort>{tekst}</BodyShort>
		</div>
	)
}