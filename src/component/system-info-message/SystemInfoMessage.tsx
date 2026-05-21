import { Alert, Heading, BodyLong } from '@navikt/ds-react'

export const SystemInfoMessage = () => {
	return (
		<Alert variant="info" size="small">
			<Heading size="small" level="1" spacing>
				Det vil ikke bli sendt flere endringsmeldinger
			</Heading>
			<BodyLong size="small">
				Nav-veileder har fått en ny løsning i Modia for påmelding og
				endring av deltakelse, og mottar forslag til endringer direkte
				fra arrangør. Det vil derfor ikke lenger bli sendt
				endringsmeldinger i dette systemet.
			</BodyLong>
		</Alert>
	)
}
