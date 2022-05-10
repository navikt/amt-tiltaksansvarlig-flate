import React from 'react'
import { isNotStartedOrPending, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { fetchAnsattTilganger, TilgangerType } from '../../../api/api'
import { useParams } from 'react-router-dom'
import { BodyShort, Loader } from '@navikt/ds-react'
import styles from './Tilgangskontroll.module.scss'

import { PersonListeElement } from './person-liste-element/PersonListeElement'
import { TilgangskontrollHeader } from './TilgangskontrollHeader'

interface TilgangskontrollProps {
	className?: string
}

export const Tilgangskontroll = (props: TilgangskontrollProps) : React.ReactElement<TilgangskontrollProps> => {
	const { gjennomforingId } = useParams()

	const ansattTilgangerPromise = usePromise<AxiosResponse<TilgangerType>>(() => fetchAnsattTilganger(gjennomforingId!))

	const tilganger = ansattTilgangerPromise.result?.data ?? []

	return (
		<section className={props.className}>
			<TilgangskontrollHeader gjennomforingId={gjennomforingId} />
			<div>
				{isNotStartedOrPending(ansattTilgangerPromise) && <Loader size="large"/>}
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
