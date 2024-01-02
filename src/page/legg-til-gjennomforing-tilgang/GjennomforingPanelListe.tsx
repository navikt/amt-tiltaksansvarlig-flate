import { Alert } from '@navikt/ds-react'
import React from 'react'

import { HentGjennomforingMedLopenr } from '../../api/api'
import { GjennomforingPanel } from './gjennomforing-panel/GjennomforingPanel'

interface GjennomforingPanelListeProps {
	gjennomforinger: HentGjennomforingMedLopenr[],
	mineGjennomforingerIds: string[]
}

export const GjennomforingPanelListe = (props: GjennomforingPanelListeProps): React.ReactElement => {
	const gjennomforinger = props.gjennomforinger

	if (gjennomforinger.length === 0) {
		return (
			<Alert variant="warning" size="small">
				Dette tiltaksnummeret kan ikke legges til
			</Alert>
		)
	}

	const alleredeIMineGjennomforinger = (id: string): boolean => props.mineGjennomforingerIds.includes(id)

	return (
		<>
			{gjennomforinger.map(g =>
				<GjennomforingPanel key={g.id} gjennomforing={g} alleredeIMineGjennomforinger={alleredeIMineGjennomforinger(g.id)} />)}
		</>
	)
}
