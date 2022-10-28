import React from 'react'
import styles from './VarighetSelect.module.scss'
import { Select } from '@navikt/ds-react'

interface VarighetSelectProps {
	selectedValue: number | null
	setVarighet: (val: number | null) => void
}

const ikkeValgt = -1

export const VarighetSelect = ({ selectedValue, setVarighet }: VarighetSelectProps): React.ReactElement => {

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = parseInt(e.target.value)
		setVarighet(val === ikkeValgt ? null : val)
	}

	const varighetSelectorValue = selectedValue === null ? ikkeValgt : selectedValue

	return (
		<Select label="Varighet:" className={styles.varighetSelect} onChange={handleChange} size="small" value={varighetSelectorValue}>
			<option value={-1}>Ikke valgt</option>
			<option value={1}>1 måned</option>
			<option value={2}>2 måneder</option>
			<option value={3}>3 måneder</option>
			<option value={6}>6 måneder</option>
			<option value={12}>12 måneder</option>
		</Select>
	)
}
