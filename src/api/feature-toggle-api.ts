import { apiUrl } from '../utils/url-utils'
import { FeatureToggles, featureToggleSchema, TOGGLES } from './feature-toggle'


export const fetchToggles = (): Promise<FeatureToggles> => {
	const features = TOGGLES.join(',')
	const url = apiUrl(`/amt-tiltak/api/nav-ansatt/unleash/feature?features=${features}`)
	return fetch(url, {
		method: 'GET',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		}
	})
		.then((response) => response.json())
		.then(featureToggleSchema.parse)
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error('Kunne ikke parse featureToggleSchema:', error)
			throw new Error('Kunne ikke parse featureToggleSchema')
		})
}
