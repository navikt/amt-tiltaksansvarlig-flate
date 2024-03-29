import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'

import { Vurdering } from '../../../api/schema/meldinger'
import { sorterMeldingerAlfabetisk } from '../endringsmeldinger/utils'
import styles from './Vurdering.module.scss'
import { VurderingPanel } from './VurderingPanel'

interface VurderingeListeProps {
	vurderinger: Vurdering[]
}

export const VurderingeListe = ({ vurderinger }: VurderingeListeProps) => {
	const VurderingerSortert = vurderinger.sort(sorterMeldingerAlfabetisk)

	return (
		<div className={styles.spaceBottom}>
			<BodyLong size="small" className={styles.description}>
				Når en person har statusen Informasjonsmøte i Arena, så kan tiltaksarrangør vurdere om personen oppfyller kravene i tiltaket eller ikke.
				NAV kan bruke vurderingen til å avgjøre hvem som skal tilbys plass på kurset.
			</BodyLong>

			{VurderingerSortert.length > 0 ? (
				vurderinger.map((vurdering) => {
					return <VurderingPanel key={vurdering.id} vurdering={vurdering} />
				})
			) : (
				<Alert variant="info" size="small" inline>
					Det er ingen vurderinger.
				</Alert>
			)}
		</div>
	)
}
