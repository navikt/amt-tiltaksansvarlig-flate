import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'

import useLocalStorage from '../../hooks/useLocalStorage'
import styles from './SystemInfoMessage.module.scss'

export const SystemInfoMessage = () => {
	const [ visMelding, setVisMelding ] = useLocalStorage(
		'amt-tiltaksansvarlig-vis-systemmelding',
		true
	)

	return visMelding ? (
		<Alert
			variant="info"
			size="small"
			closeButton
			onClose={() => setVisMelding(false)}
		>
			<Heading size="small" level="1">
				Ny løsning for administrering av kurs lanseres 3. juni
			</Heading>
			<BodyLong size="small" className={styles.alert_text}>
				Den nye løsningen vil inneholde en samlet oversikt over innsøkte
				deltakere, funksjonalitet for å gjøre uttak til kurs, samt dele
				og motta vurderinger fra tiltaksarrangør.{' '}
			</BodyLong>
			<Link href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-tiltak-og-virkemidler/SitePages/Administrering-av-deltakelse-p%C3%A5-kurstiltak.aspx">
				Les mer om ny løsning på Navet.
			</Link>
		</Alert>
	) : null
}
