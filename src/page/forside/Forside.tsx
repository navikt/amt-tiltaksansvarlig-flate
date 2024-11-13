import { PlusIcon } from '@navikt/aksel-icons'
import {
	Alert,
	BodyLong,
	Heading,
	Link as SimpleLink,
	Loader
} from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'

import { fetchGjennomforinger } from '../../api/api'
import globalStyles from '../../globals.module.scss'
import useFetch from '../../hooks/useFetch'
import { LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE } from '../../navigation'
import styles from './Forside.module.scss'
import { GjennomforingListe } from './gjennomforing-liste/GjennomforingListe'

export const Forside = (): React.ReactElement => {
	const {
		data: gjennomforinger,
		loading,
		error
	} = useFetch(fetchGjennomforinger)

	if (loading) return <Loader />

	if (error || !gjennomforinger)
		return <Alert variant="error">Noe gikk galt, Feil: {error}</Alert>

	return (
		<main className={styles.mainPage} data-testid="forside-page">
			<div className={cls(styles.header, globalStyles.blokkM)}>
				<Heading size="medium">Min tiltaksoversikt</Heading>
				<Link
					to={LEGG_TIL_GJENNOMFORING_TILGANG_PAGE_ROUTE}
					className="navds-link"
					data-testid="legg-til-gjennomforing-link"
				>
					<PlusIcon aria-labelledby="legg-til" />
					<span id="legg-til">Legg til</span>
				</Link>
			</div>
			<Alert variant="info" className={styles.alert_info_endringer}>
				<Heading
					size="xsmall"
					level="2"
					className={styles.alert_heading}
				>
					Fra 19. november kan du ikke endre deltakelser i Arena på
					tiltakene oppfølging, avklaring og ARR
				</Heading>
				<BodyLong>
					Den nye løsningen for påmelding og endring av deltakelse for
					Nav-veileder blir snart tilgjengelig for disse tiltakene.
					Tiltaksarrangør kan sende forslag om endringer direkte til
					Nav-veileder.
				</BodyLong>
				<SimpleLink
					className={styles.linke_navet}
					href="https://navno.sharepoint.com/sites/intranett-produktomrader-og-prosjekter/SitePages/Ny-l%C3%B8sning-for-p%C3%A5melding-til-arbeidsforberedende-trening.aspx"
				>
					Les mer om ny løsning på Navet.
				</SimpleLink>
				<BodyLong weight="semibold">
					FRIST: Alle endringsmeldinger for oppfølging, avklaring og
					ARR må legges inn i Arena innen 18. nov. kl. 15
				</BodyLong>
				<BodyLong>
					Fra 14. nov. kl. 15 kan ikke tiltaksarrangør sende inn nye
					endringsmeldinger.
				</BodyLong>
				<SimpleLink
					className={styles.linke_nav}
					href="https://www.nav.no/nytt-i-deltakeroversikten"
				>
					Tiltaksarrangør er informert her på nav.no.
				</SimpleLink>
			</Alert>
			<GjennomforingListe gjennomforinger={gjennomforinger} />
		</main>
	)
}
