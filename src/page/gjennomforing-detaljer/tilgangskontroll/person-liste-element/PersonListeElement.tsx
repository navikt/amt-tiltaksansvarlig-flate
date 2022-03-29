import React from 'react'
import { People } from '@navikt/ds-icons'
import { BodyShort } from '@navikt/ds-react'
import { lagKommaSeparertBrukerNavn } from '../../../../utils/bruker-utils'
import styles from './PersonListeElement.module.scss'
import { Nullable } from '../../../../utils/types'

interface PersonListeElementProps {
	fornavn: string,
	mellomnavn: Nullable<string>,
	etternavn: string
}

export const PersonListeElement = (props: PersonListeElementProps) : React.ReactElement<PersonListeElementProps> => {
	const { fornavn, mellomnavn, etternavn } = props

	return (
		<li className={styles.listItem}>
			<People className={styles.ikon}/>
			<BodyShort>{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}</BodyShort>
		</li>
	)
}