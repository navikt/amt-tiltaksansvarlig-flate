import { Alert, BodyShort, Heading, Link } from '@navikt/ds-react'
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
			<Heading size="small" level="1" spacing>
				Fra 3. juni kan du ikke endre deltakelser i Arena for tiltakene gruppe-AMO, gruppe fag- og
				yrkesopplæring og jobbklubb
			</Heading>
			<BodyShort size="small">
				Den nye løsningen for påmelding og endring av deltakelse for Nav-veileder blir snart tilgjengelig for
				disse tiltakene. Tiltaksarrangør kan sende forslag om endringer direkte til Nav-veileder.
			</BodyShort>
			<br/>
			<BodyShort size="small">
				Nye vurderinger fra tiltaksarrangør vises allerede nå i deltakerlisten til hver gjennomføring. Eldre
				vurderinger vil bli liggende i denne tjenesten i en periode etter overgang til ny løsning.{' '}
			</BodyShort>
			<Link className={styles.alert_text}
				href="https://navno.sharepoint.com/sites/fag-og-ytelser-arbeid-tiltak-og-virkemidler/SitePages/Administrering-av-deltakelse-p%C3%A5-kurstiltak.aspx">
				Les mer om ny løsning på Navet.
			</Link>
			<BodyShort size="small">
				<b>FRIST: Alle endringsmeldinger for disse tiltakene må legges inn i Arena innen 2. juni kl. 15</b>
				<br/>
				Fra 27. mai kl. 15 kan ikke tiltaksarrangør sende inn nye endringsmeldinger.
			</BodyShort>
			<Link
				className={styles.alert_text}
				href="https://www.nav.no/samarbeidspartner/nytt-i-deltakeroversikten">
				Tiltaksarrangør er informert her på nav.no.
			</Link>
		</Alert>
	) : null
}