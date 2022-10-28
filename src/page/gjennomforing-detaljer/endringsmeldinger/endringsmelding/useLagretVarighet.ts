import { useEffect, useState } from 'react'

const LOCAL_STORAGE_VARIGHET = 'endringsmeldingVarighet'

type LagretVarighet = { [gjennomforingId: string]: number | null }

const hentLagretVarighet = (): LagretVarighet => {
	const data = localStorage.getItem(LOCAL_STORAGE_VARIGHET)

	if (data !== null) {
		const json = JSON.parse(data)

		const lagretVarighet: LagretVarighet = {}

		Object.keys(json).forEach(k => {
			if (typeof json[k] === 'number' || json[k] === null) {
				lagretVarighet[k] = json[k]
			}
		})

		return lagretVarighet
	}

	return {}
}

export const useLagretVarighet = (gjennomforingId: string, defaultVarighet: number | null): [number | null, (v: number | null) => void] => {
	const [ varighet, setVarighet ] = useState<number | null>(defaultVarighet)

	useEffect(() => {
		const lagretVarighet = hentLagretVarighet()
		const varighetForGjennomforing = lagretVarighet[gjennomforingId]

		if (varighetForGjennomforing !== undefined) {
			setVarighet(varighetForGjennomforing)
		}

	}, [ gjennomforingId ])

	const endreVarighet = (v: number | null) => {
		const lagretVarighet = hentLagretVarighet()

		lagretVarighet[gjennomforingId] = v

		localStorage.setItem(LOCAL_STORAGE_VARIGHET, JSON.stringify(lagretVarighet))
		setVarighet(v)
	}

	return [ varighet, endreVarighet ]
}

