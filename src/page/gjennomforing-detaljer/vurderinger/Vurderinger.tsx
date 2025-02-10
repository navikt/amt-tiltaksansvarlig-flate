import { Heading } from '@navikt/ds-react'
import React from 'react'

import { Vurdering } from '../../../api/schema/meldinger'
import globalStyles from '../../../globals.module.scss'
import { useFeatureToggle } from '../../../hooks/useFeatureToggle'
import { NyFlateInfoStripe } from './NyFlateInfoStripe'
import { VurderingeListe } from './VurderingerListe'

interface EndringsmeldingerProps {
	vurderinger: Vurdering[]
}

export const Vurderinger = ({ vurderinger }: EndringsmeldingerProps) => {
	const { skalViseInfomelding } = useFeatureToggle()

	return (
		<section className={globalStyles.blokkL}>
			{ skalViseInfomelding && <NyFlateInfoStripe/>}
			<Heading size="small" level="2" spacing>
				Vurdering fra tiltaksarrangør
			</Heading>
			<VurderingeListe vurderinger={vurderinger} />
		</section>
	)
}
