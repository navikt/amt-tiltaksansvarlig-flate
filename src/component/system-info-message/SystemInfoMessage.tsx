import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
import React from 'react'

import styles from './SystemInfoMessage.module.scss'

export const SystemInfoMessage = () => {
	return (
		<Alert variant="info" size="small">
			<Heading size="small" level="1" spacing>
				Fra 3. juni kan du ikke endre deltakelser i Arena for tiltakene
				gruppe-AMO, gruppe fag- og yrkesopplæring og jobbsøkerkurs
			</Heading>
			<BodyShort size="small">
				Nav-veileder har fått ny løsning i Modia for påmelding og
				endring av deltakelse. Tiltaksarrangør kan sende forslag om
				endringer direkte til Nav-veileder.
			</BodyShort>
			<br />
			<BodyShort size="small">
				Nye vurderinger fra tiltaksarrangør vises i deltakerlisten til
				hver gjennomføring. Eldre vurderinger vil bli liggende i denne
				tjenesten i en periode etter overgang til ny løsning.{' '}
			</BodyShort>
			<Link
				className={styles.alert_text}
				href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-tiltak-og-virkemidler/SitePages/Administrering-av-deltakelse-p%C3%A5-kurstiltak.aspx"
			>
				Les mer om ny løsning på Navet.
			</Link>
		</Alert>
	)
}