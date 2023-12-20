import { Select } from '@navikt/ds-react'
import React from 'react'

import { EndringsmeldingSortering } from '../utils'
import styles from './SorteringSelect.module.scss'

interface SorteringSelectProps {
	sortering: EndringsmeldingSortering
	setSortering: (val: EndringsmeldingSortering) => void
}

export const SorteringSelect = ({ sortering, setSortering }: SorteringSelectProps): React.ReactElement => {

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = parseInt(e.target.value) as EndringsmeldingSortering
		setSortering(val)
	}

	return (
		<Select label="Sortering" className={styles.varighetSelect} onChange={handleChange} size="small" value={sortering}>
			<option value={EndringsmeldingSortering.ALFABETISK}>Alfabetisk</option>
			<option value={EndringsmeldingSortering.DATO_SENDT_DESC}>Dato sendt</option>
			<option value={EndringsmeldingSortering.UTFORT_TIDSPUNKT_DESC}>Ferdig tidspunkt</option>
		</Select>
	)
}

