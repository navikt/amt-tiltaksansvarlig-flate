import React from 'react'
import { BodyShort, Button } from '@navikt/ds-react'
import styles from './TilgangListeContent.module.scss'
import { Tilgang } from '../../../../api/api'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import { formatDate } from '../../../../utils/date-utils'

interface AnsattTilgangListeElementProps {
	ansattTilgang: Tilgang
	onSlettTilgang: (tilgangId: string) => void
}

export const TilgangListeContent = (props: AnsattTilgangListeElementProps): React.ReactElement<AnsattTilgangListeElementProps> => {
	const { id, fornavn, mellomnavn, etternavn, opprettetDato, opprettetAvNavIdent } = props.ansattTilgang

	return (
		<>
			<div>
				<BodyShort className={styles.bold} spacing>{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}</BodyShort>
				<BodyShort>Fikk tilgang: {formatDate(opprettetDato)}</BodyShort>
				<BodyShort>Hvem ga tilgangen: {opprettetAvNavIdent}</BodyShort>
			</div>

			<div>
				<Button type="button" variant="tertiary" onClick={() => props.onSlettTilgang(id)}>Slett tilgang</Button>
			</div>
		</>
	)
}