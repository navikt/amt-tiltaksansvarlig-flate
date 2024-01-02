import { Button, TextField } from '@navikt/ds-react'
import React, { useState } from 'react'

import styles from './LopenummerPicker.module.scss'

interface Props {
    isLoading: boolean;
    onSokClicked: (tiltaksnummer: number) => void;
}

export const LopenummerPicker = ({ isLoading, onSokClicked }: Props) => {
	const [ lopenrSokefelt, setLopenrSokefelt ] = useState<string>('')

	const kunSiffer = (value: string): boolean => {
		return !!value.match('^[0-9]+$')
	}

	const isValidLopenr = (value: string): boolean => {
		return (kunSiffer(value) && value.length <= 7) || value === ''
	}

	const handleOnSokClicked = () => {
		onSokClicked(parseInt(lopenrSokefelt))
	}

	return (
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
				className={styles.sokKnapp}
				onClick={handleOnSokClicked}
				disabled={isLoading || !lopenrSokefelt}
				loading={isLoading}
			>
                Søk
			</Button>
		</div>
	)
}
