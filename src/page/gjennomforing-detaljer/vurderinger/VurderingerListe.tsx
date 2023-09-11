import { Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'

import { Vurdering } from '../../../api/schema/meldinger'
import { sorterMeldinger } from '../endringsmeldinger/utils'
import styles from './Vurdering.module.scss'
import { VurderingPanel } from './VurderingPanel'

interface VurderingeListeProps {
	vurderinger: Vurdering[]
}

export const VurderingeListe = ({ vurderinger }: VurderingeListeProps) => {
	const VurderingerSortert = vurderinger.sort(sorterMeldinger)

	return (
		<div className={styles.spaceBottom}>
			<BodyLong size="small" className={styles.description}>
				Når tiltaksarrangør ser en deltaker med status “Vurderes” (Arena-statusen er “Informasjonsmøte”), så kan de sende en vurdering på deltakeren.
				Denne informasjonen kan brukes til å vurdere om hvem som tilbys plass på kurset.
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
