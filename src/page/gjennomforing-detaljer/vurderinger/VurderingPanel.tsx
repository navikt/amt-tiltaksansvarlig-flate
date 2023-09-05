import { BodyShort, Detail, Heading, Panel, Tag } from '@navikt/ds-react'
import React  from 'react'

import { Vurdering, Vurderingstype } from '../../../api/schema/meldinger'
import { PanelLinje } from '../../../component/message-panel/PanelLinje'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import styles from './Vurdering.module.scss'

interface VurderingPanelProps {
	vurdering: Vurdering
}

export const VurderingPanel = ({ vurdering }: VurderingPanelProps): React.ReactElement => {
	const deltaker = vurdering.deltaker
	const erSkjermet = deltaker.erSkjermet
	const navn = deltaker.fornavn && deltaker.etternavn ? lagKommaSeparertBrukerNavn(deltaker.fornavn, deltaker.mellomnavn, deltaker.etternavn) : ''

	return (
		<Panel border className={styles.panel}>
			<div className={styles.meldingInnholdColumn}>
				{erSkjermet && (
					<Tag size="small" variant="warning" style={{ marginBottom: '0.5rem' }}>
						Skjermet
					</Tag>
				)}
				<PanelLinje className={styles.spaceBottom}>
					<Heading size="xsmall" level="3">
						{navn}
					</Heading>
					<BodyShort size="medium" className={styles.fnr}>
						{deltaker.fodselsnummer}
					</BodyShort>
				</PanelLinje>
				<BodyShort size="small" className={styles.vurderingstype}>
					<Tag size="small" variant={vurdering.vurderingstype === Vurderingstype.OPPFYLLER_IKKE_KRAVENE ? 'error' : 'success'}>
						{formatVurderingType(vurdering.vurderingstype)}
					</Tag>
				</BodyShort>
			</div>
			<div className={styles.rightColumn}>
				<Detail className={styles.sendt}>Sendt: {formatDate(vurdering.opprettetDato)}</Detail>
			</div>
		</Panel>
	)
}

const formatVurderingType = (vurderingsType: Vurderingstype) => {
	switch (vurderingsType) {
		case Vurderingstype.OPPFYLLER_IKKE_KRAVENE:
			return 'Oppfyller ikke kravene'
		case Vurderingstype.OPPFYLLER_KRAVENE:
			return 'Oppfyller kravene'
	}
}
