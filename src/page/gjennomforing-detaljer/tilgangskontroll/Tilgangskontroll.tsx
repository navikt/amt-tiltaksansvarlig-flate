import React from 'react'
import { isNotStartedOrPending, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { fetchAnsattTilganger, Tilganger } from '../../../api/api'
import { Link, useParams } from 'react-router-dom'
import { BodyShort, Loader } from '@navikt/ds-react'
import styles from './Tilgangskontroll.module.scss'

import cls from 'classnames'
import { PersonListeElement } from './person-liste-element/PersonListeElement'
import { tilgangskontrollPageUrl } from '../../../navigation'

interface TilgangskontrollProps {
	className?: string
}

export const Tilgangskontroll = (props: TilgangskontrollProps) : React.ReactElement<TilgangskontrollProps> => {
	const { gjennomforingId } = useParams()

	const ansattTilgangerPromise = usePromise<AxiosResponse<Tilganger>>(() => fetchAnsattTilganger(gjennomforingId!))

	const tilganger = ansattTilgangerPromise.result?.data ?? []

	return (
		<section className={cls(styles.tilgangskontroll, props.className)}>
			<div>
				{isNotStartedOrPending(ansattTilgangerPromise) && <Loader size="large"/>}
				{tilganger.length === 0
					? (<BodyShort>Ingen koordinatorer har tilgang</BodyShort>)
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

			<div>
				<Link to={tilgangskontrollPageUrl(gjennomforingId!)} className="navds-button navds-button--secondary navds-button--medium">
					Tilgangskontroll
				</Link>
			</div>
		</section>
	)
}