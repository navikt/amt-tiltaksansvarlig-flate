import { Heading } from '@navikt/ds-react'
import React from 'react'

import { Endringsmelding } from '../../../api/schema/meldinger'
import globalStyles from '../../../globals.module.scss'
import { EndringsmeldingListe } from './endringsmeldingsliste/EndringsmeldingListe'

interface EndringsmeldingerProps {
	gjennomforingId: string
	endringsmeldinger: Endringsmelding[]
	refresh: () => void
}

export const Endringsmeldinger = (props: EndringsmeldingerProps) => {
	return (
		<section className={globalStyles.blokkL}>
			<Heading size="small" level="2" spacing>Endringsmeldinger fra tiltaksarrangør</Heading>
			<EndringsmeldingListe
				gjennomforingId={props.gjennomforingId}
				meldinger={props.endringsmeldinger}
				refresh={props.refresh}
			/>
		</section>
	)
}
