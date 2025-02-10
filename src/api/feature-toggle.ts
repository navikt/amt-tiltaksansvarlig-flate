import { z } from 'zod'

export const VIS_INFOMELDING_NY_FLATE = 'amt.vis-infomelding-ny-visning-vurderinger'

export const featureToggleSchema = z.object({
	[VIS_INFOMELDING_NY_FLATE]: z.boolean(),
})

export const TOGGLES = featureToggleSchema.keyof().options

export type FeatureToggles = z.infer<typeof featureToggleSchema>
