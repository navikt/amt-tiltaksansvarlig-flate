import { Alert, BodyLong, Heading, Link } from '@navikt/ds-react'
import React from 'react'
import { useParams } from 'react-router-dom'

import globalStyles from '../../../globals.module.scss'
import { tiltaksadministrasjonUrl } from '../../../utils/url-utils'

export const NyFlateInfoStripe = () => {
	const { gjennomforingId } = useParams()
	const link = `${tiltaksadministrasjonUrl}/gjennomforinger/${gjennomforingId}/deltakerliste`

	return (
		<Alert variant="info" className={globalStyles.blokkS}>
			<Heading size="xsmall">Ny visning av vurderinger er nå tilgjengelig</Heading>
			<BodyLong size="small">
				Vurderinger er nå tilgjengelig i Deltakerlisten under Gjennomføringer.
				Denne siden vil fortsatt oppdateres når det kommer nye vurderinger fra
				arrangør. <Link href={link}>Trykk her for å se den nye oversikten.</Link>
			</BodyLong>
		</Alert>
	)
}
