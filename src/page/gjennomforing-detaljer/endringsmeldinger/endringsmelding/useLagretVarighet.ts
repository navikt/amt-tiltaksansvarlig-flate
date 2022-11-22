import { useEffect, useState } from 'react'
import { VarighetValg } from './VarighetSelect'

const LOCAL_STORAGE_VARIGHET = 'endringsmeldingVarighet'

type LagretVarighet = { [gjennomforingId: string]: VarighetValg }

const hentLagretVarighet = (): LagretVarighet => {
	const data = localStorage.getItem(LOCAL_STORAGE_VARIGHET)

	if (data !== null) {
		const json = JSON.parse(data)

		const lagretVarighet: LagretVarighet = {}

		Object.keys(json).forEach(k => {
			if (typeof json[k] === 'number') {
				lagretVarighet[k] = json[k]
			}
		})

		return lagretVarighet
	}

	return {}
}

export const useLagretVarighet = (gjennomforingId: string, defaultVarighet: VarighetValg): [VarighetValg, (v: VarighetValg) => void] => {
	const [ varighet, setVarighet ] = useState<VarighetValg>(defaultVarighet)

	useEffect(() => {
		const lagretVarighet = hentLagretVarighet()
		const varighetForGjennomforing = lagretVarighet[gjennomforingId]

		if (varighetForGjennomforing !== undefined) {
			setVarighet(varighetForGjennomforing)
		}

	}, [ gjennomforingId ])

	const endreVarighet = (v: VarighetValg) => {
		const lagretVarighet = hentLagretVarighet()

		lagretVarighet[gjennomforingId] = v

		localStorage.setItem(LOCAL_STORAGE_VARIGHET, JSON.stringify(lagretVarighet))
		setVarighet(v)
	}

	return [ varighet, endreVarighet ]
}
