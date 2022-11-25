import React from 'react'
import styles from './VarighetSelect.module.scss'
import { Select } from '@navikt/ds-react'

interface VarighetSelectProps {
	varighetValg: VarighetValg
	setVarighetValg: (val: VarighetValg) => void
}

export enum VarighetValg {
	IKKE_VALGT,
	FIRE_UKER,
	SEKS_UKER,
	ATTE_UKER,
	TRE_MANEDER,
	SEKS_MANEDER,
	TOLV_MANEDER,
}

export interface Varighet {
	antall: number
	tidsenhet: 'day' | 'week' | 'month' | 'year'
}

type Varigheter = {
	[valg in VarighetValg]: Varighet | null
}

export const varigheter: Varigheter = {
	[VarighetValg.IKKE_VALGT]: null,
	[VarighetValg.FIRE_UKER]: { antall: 4, tidsenhet: 'week' },
	[VarighetValg.SEKS_UKER]: { antall: 6, tidsenhet: 'week' },
	[VarighetValg.ATTE_UKER]: { antall: 8, tidsenhet: 'week' },
	[VarighetValg.TRE_MANEDER]: { antall: 3, tidsenhet: 'month' },
	[VarighetValg.SEKS_MANEDER]: { antall: 6, tidsenhet: 'month' },
	[VarighetValg.TOLV_MANEDER]: { antall: 12, tidsenhet: 'month' },
}


export const VarighetSelect = ({ varighetValg, setVarighetValg }: VarighetSelectProps): React.ReactElement => {

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const val = parseInt(e.target.value) as VarighetValg
		setVarighetValg(val)
	}

	const varighetSelectValue = varighetValg === null ? VarighetValg.IKKE_VALGT : varighetValg

	return (
		<Select label="Varighet etter oppstartsdato" className={styles.varighetSelect} onChange={handleChange} size="small" value={varighetSelectValue}>
			<option value={VarighetValg.IKKE_VALGT}>Ikke valgt</option>
			<option value={VarighetValg.FIRE_UKER}>4 uker</option>
			<option value={VarighetValg.SEKS_UKER}>6 uker</option>
			<option value={VarighetValg.ATTE_UKER}>8 uker</option>
			<option value={VarighetValg.TRE_MANEDER}>3 måneder</option>
			<option value={VarighetValg.SEKS_MANEDER}>6 måneder</option>
			<option value={VarighetValg.TOLV_MANEDER}>12 måneder</option>
		</Select>
	)
}

