import { useEffect, useState } from 'react'

import { VarighetValg } from './VarighetSelect'

const LOCAL_STORAGE_VARIGHET = 'endringsmeldingVarighet'

type LagretVarighetValg = { [gjennomforingId: string]: VarighetValg }

const hentLagretVarighetValg = (): LagretVarighetValg => {
	const data = localStorage.getItem(LOCAL_STORAGE_VARIGHET)

	if (data !== null) {
		const json = JSON.parse(data)

		const lagretVarighetValg: LagretVarighetValg = {}

		Object.keys(json).forEach(k => {
			if (typeof json[k] === 'number') {
				lagretVarighetValg[k] = json[k]
			}
		})

		return lagretVarighetValg
	}

	return {}
}

export const useLagretVarighetValg = (gjennomforingId: string, defaultVarighet: VarighetValg): [VarighetValg, (v: VarighetValg) => void] => {
	const [ varighetValg, setVarighetValg ] = useState<VarighetValg>(defaultVarighet)

	useEffect(() => {
		const lagretVarighetValg = hentLagretVarighetValg()
		const varighetForGjennomforing = lagretVarighetValg[gjennomforingId]

		if (varighetForGjennomforing !== undefined) {
			setVarighetValg(varighetForGjennomforing)
		}

	}, [ gjennomforingId ])

	const endreVarighetValg = (v: VarighetValg) => {
		const lagretVarighetValg = hentLagretVarighetValg()

		lagretVarighetValg[gjennomforingId] = v

		localStorage.setItem(LOCAL_STORAGE_VARIGHET, JSON.stringify(lagretVarighetValg))
		setVarighetValg(v)
	}

	return [ varighetValg, endreVarighetValg ]
}
