import { BodyShort, Button } from '@navikt/ds-react'
import React from 'react'

import styles from './Endringsmelding.module.scss'

interface FerdigKnappProps {
	inaktiv: boolean,
	skalSkjules: boolean,
	onClick: () => void,
	disabled: boolean,
	loading: boolean,

}

export const FerdigKnapp = ({ inaktiv, skalSkjules, onClick, disabled, loading }: FerdigKnappProps) => {
	const handleOnFerdigClicked = () => {
		onClick()
	}

	if (inaktiv) return (
		<BodyShort className={styles.gray}>Ferdig</BodyShort>
	)

	if (skalSkjules) return null

	return (
		<Button
			size="small"
			onClick={handleOnFerdigClicked}
			disabled={disabled}
			loading={loading}
		>
			Ferdig
		</Button>
	)
}
