import { BodyShort } from '@navikt/ds-react'
import React from 'react'

import { PersonListeElement } from './person-liste-element/PersonListeElement'
import styles from './Tilgangskontroll.module.scss'
import { TilgangskontrollHeader } from './TilgangskontrollHeader'

interface TilgangskontrollProps {
	className?: string
}

export interface Tilgang {
	id: string,
	fornavn: string,
	mellomnavn: string | undefined,
	etternavn: string,
	opprettetDato: Date,
	opprettetAvNavIdent: string
}

/*
	Denne komponenten er pr nå ubrukt, men skal reimplementeres senere når det blir godkjent å vise navn på tiltaksarrangør ansatte
*/

export const Tilgangskontroll = (props: TilgangskontrollProps) : React.ReactElement<TilgangskontrollProps> => {

	const tilganger: Tilgang[] = []

	return (
		<section className={props.className}>
			<TilgangskontrollHeader />
			<div>
				{/*{isNotStartedOrPending(ansattTilgangerPromise) && <Loader size="large"/>}*/}

				{tilganger.length === 0
					? (<BodyShort className={styles.ingenElementer}>Ingen koordinatorer har tilgang</BodyShort>)
					: (
						<ul className={styles.liste}>
							{tilganger.map(t => (
								<PersonListeElement
									fornavn={t.fornavn}
									mellomnavn={t.mellomnavn}
									etternavn={t.etternavn}
									key={t.id}
								/>
							))}
						</ul>
					)
				}
			</div>
		</section>
	)
}
