import { useEffect, useState } from 'react'

export const useVarighet = (key: string, defaultVerdi: number): [number, (v:number) => void] => {
	const [ varighet, setVarighet ] = useState<number>(defaultVerdi)

	useEffect(() => {
		const v = localStorage.getItem(key)
		if (v) {
			setVarighet(parseInt(v))
		} else {
			setVarighet(defaultVerdi)
		}
	}, [])

	const endreVarighet = (v: number) => {
		localStorage.setItem(key, JSON.stringify(v))
		setVarighet(v)
	}

	return [ varighet, endreVarighet ]
}

