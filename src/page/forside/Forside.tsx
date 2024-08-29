import { PlusIcon } from '@navikt/aksel-icons'
import {
	Alert,
	BodyShort,
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
			<Alert
				variant="info"
				size="small"
				className={styles.alert_info_endringer}
			>
				<Heading size="xsmall" level="2">
					Etter 1. oktober vil du ikke kunne endre deltakelser på
					AFT-tiltak i Arena
				</Heading>
				<BodyShort
					className={styles.alert_info_endringer_text}
					size="small"
				>
					NAV-veileder får ny løsning i Modia for påmelding og endring
					av deltakere. Arrangør kan sende forslag direkte til
					NAV-veileder.{' '}
					<SimpleLink href="https://www.nav.no/nytt-i-deltakeroversikten">
						Tiltaksarrangør er informert her på nav.no.
					</SimpleLink>
				</BodyShort>
				<BodyShort size="small">
					AFT-tiltaket er den første tiltakstypen i ny løsning. Flere
					tiltakstyper vil komme etterhvert.{' '}
					<SimpleLink href="https://navno.sharepoint.com/sites/intranett-produktomrader-og-prosjekter/SitePages/Ny-l%C3%B8sning-for-p%C3%A5melding-til-arbeidsforberedende-trening.aspx?">
						Les mer om endringene på Navet.
					</SimpleLink>
				</BodyShort>
			</Alert>
			<GjennomforingListe gjennomforinger={gjennomforinger} />
		</main>
	)
}
