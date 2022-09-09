import { useEffect, useState } from 'react'

const LOCAL_STORAGE_VARIGHET = 'endringsmeldingVarighet'

export const useLagretVarighet = (defaultVarighet: number): [number, (v: number) => void] => {
	const [ varighet, setVarighet ] = useState<number>(defaultVarighet)

	useEffect(() => {
		const lagretVarighet = localStorage.getItem(LOCAL_STORAGE_VARIGHET)
		if (lagretVarighet) {
			setVarighet(parseInt(lagretVarighet))
		} 
	}, [])

	const endreVarighet = (v: number) => {
		localStorage.setItem(LOCAL_STORAGE_VARIGHET, JSON.stringify(v))
		setVarighet(v)
	}

	return [ varighet, endreVarighet ]
}

