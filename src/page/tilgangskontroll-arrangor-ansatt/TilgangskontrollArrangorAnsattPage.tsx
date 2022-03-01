import { BodyShort, Button, Heading } from '@navikt/ds-react'
import React from 'react'

import { AnsattTilgang } from '../../api/data/ansatt-tilgang'
import { GjennomforingTilgang } from '../../api/data/gjennomforing-tilgang'
import { Tilbakelenke } from '../../component/tilbakelenke/Tilbakelenke'
import globalStyles from '../../globals.module.scss'
import { TILGANGSKONTROLL_PAGE_ROUTE } from '../../navigation'
import { GjennomforingTilgangTabell } from './gjennomforing-tilgang-tabell/GjennomforingTilgangTabell'
import styles from './TilgangskontrollArrangorAnsattPage.module.scss'
import { VirksomhetTilgangTabell } from './virksomhet-tilgang-tabell/VirksomhetTilgangTabell'

const ansattTilganger: AnsattTilgang[] = [
	{
		id: '123',
		virksomhetNavn: 'Virksomhet AS',
		rolle: 'KOORDINATOR',
		opprettetAvNavIdent: 'Z1234'
	},
	{
		id: '1235',
		virksomhetNavn: 'Muligheter AS',
		rolle: 'KOORDINATOR',
		opprettetAvNavIdent: 'Z54378'
	}
]

const gjennomforingTilganger: GjennomforingTilgang[] = [
	{
		id: '123',
		gjennomforingNavn: 'Oppfølging Oslo',
		virksomhetNavn: 'Virksomhet AS',
		opprettetAvNavIdent: 'Z1234'
	},
	{
		id: '1235',
		gjennomforingNavn: 'Oppfølging Hadeland',
		virksomhetNavn: 'Muligheter AS',
		opprettetAvNavIdent: 'Z54378'
	}
]

export const TilgangskontrollArrangorAnsattPage = (): React.ReactElement => {
	return (
		<main className={styles.page}>
			<Tilbakelenke to={TILGANGSKONTROLL_PAGE_ROUTE} className={globalStyles.blokkL} />

			<BodyShort className={globalStyles.blokkM}><strong>Test Testersen</strong></BodyShort>

			<div className={globalStyles.blokkXl}>
				<Heading size="large" level="2">Virksomheter</Heading>
				<VirksomhetTilgangTabell ansattTilganger={ansattTilganger} className={globalStyles.blokkXs}/>
				<Button variant="primary" type="button">Legg til</Button>
			</div>

			<div className={globalStyles.blokkXl}>
				<Heading size="large" level="2">Gjennomføringer</Heading>
				<GjennomforingTilgangTabell gjennomforingTilganger={gjennomforingTilganger} className={globalStyles.blokkXs}/>
				<Button variant="primary" type="button">Legg til</Button>
			</div>

			<Button variant="danger">Fjern ansatt</Button>
		</main>
	)
}