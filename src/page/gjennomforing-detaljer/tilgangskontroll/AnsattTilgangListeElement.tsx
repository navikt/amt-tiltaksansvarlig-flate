import React from 'react'
import { AnsattTilgang } from '../../../api/api'
import { People } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import styles from './AnsattTilgangListeElement.module.scss'

interface AnsattTilgangListeElementProps {
	ansattTilgang: AnsattTilgang
}

export const AnsattTilgangListeElement = (props: AnsattTilgangListeElementProps) : React.ReactElement<AnsattTilgangListeElementProps> => {
	const { fornavn, mellomnavn, etternavn } = props.ansattTilgang

	return (
		<li className={styles.listItem}>
			<People className={styles.ikon}/>
			<BodyShort>{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}</BodyShort>
		</li>
	)
}