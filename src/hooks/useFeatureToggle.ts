import { useEffect, useState } from 'react'

import { FeatureToggles, VIS_INFOMELDING_NY_FLATE } from '../api/feature-toggle'
import { fetchToggles } from '../api/feature-toggle-api'

let cachedFeatureToggles: FeatureToggles | undefined = undefined

export const useFeatureToggle = () => {
	const [ toggles, setToggles ] = useState<FeatureToggles>()

	useEffect(() => {
		if (cachedFeatureToggles) {
			setToggles(cachedFeatureToggles)
			return
		}
		fetchToggles().then((result) => {
			setToggles(result)
			cachedFeatureToggles = result
		})
	}, [])

	const skalViseInfomelding = toggles?.[VIS_INFOMELDING_NY_FLATE] == true

	return {
		skalViseInfomelding
	}
}
