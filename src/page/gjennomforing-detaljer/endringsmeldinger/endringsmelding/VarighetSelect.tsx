import React from 'react'
import styles from './VarighetSelect.module.scss'
import { Select } from '@navikt/ds-react'

interface InlineSelectVarighetProps {
    selectedValue: number
    setVarighet: (val: number) => void
}

interface ItemInterface {
    value: number
}

export const VarighetSelect = ({ selectedValue, setVarighet }: InlineSelectVarighetProps): React.ReactElement => {

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = parseInt(e.target.value)
		setVarighet(val)
	}

	const Item = ({ value }: ItemInterface) => <option value={value} key={value}> {value} måneder</option>

	return (
		<Select label="Varighet:" className={styles.varighetSelect} onChange={handleChange} size="small" value={selectedValue}>
			<Item value={6} />
			<Item value={3} />
		</Select>
	)
}
