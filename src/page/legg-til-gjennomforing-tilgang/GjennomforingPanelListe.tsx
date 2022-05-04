import React from 'react'
import { HentGjennomforingMedLopenrType } from '../../api/api'
import { Alert } from '@navikt/ds-react'
import { GjennomforingPanel } from './gjennomforing-panel/GjennomforingPanel'

interface GjennomforingPanelListeProps {
	gjennomforinger: HentGjennomforingMedLopenrType[]
}

export const GjennomforingPanelListe = (props: GjennomforingPanelListeProps): React.ReactElement => {
	const gjennomforinger = props.gjennomforinger

	if (gjennomforinger.length === 0) {
		return (
			<Alert variant="warning" size="small">
				Det er ingen aktive tiltak med dette tiltaksnummeret i Arena
			</Alert>
		)
	}

	return (
		<>
			{gjennomforinger.map(g => <GjennomforingPanel gjennomforing={g}/>)}
		</>
	)
}