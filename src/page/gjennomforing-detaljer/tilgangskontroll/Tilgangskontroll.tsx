import React from 'react'
import { isNotStartedOrPending, usePromise } from '../../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { AnsattTilganger, fetchAnsattTilganger } from '../../../api/api'
import { Link, useParams } from 'react-router-dom'
import { Heading, Loader } from '@navikt/ds-react'
import styles from './Tilgangskontroll.module.scss'
import globalStyles from '../../../globals.module.scss'

import cls from 'classnames'
import { PersonListeElement } from './person-liste-element/PersonListeElement'
import { tilgangskontrollPageUrl } from '../../../navigation'

interface TilgangskontrollProps {
	className?: string
}

export const Tilgangskontroll = (props: TilgangskontrollProps) : React.ReactElement<TilgangskontrollProps> => {
	const { gjennomforingId } = useParams()

	const ansattTilgangerPromise = usePromise<AxiosResponse<AnsattTilganger>>(() => fetchAnsattTilganger(gjennomforingId!))

	const tilganger = ansattTilgangerPromise.result?.data ?? []

	return (
		<section className={cls(styles.tilgangskontroll, props.className)}>
			<div>
				<Heading level="2" size="small" className={globalStyles.blokkXs}>Koordinator</Heading>
				{isNotStartedOrPending(ansattTilgangerPromise) && <Loader size="large"/>}
				<ul className={styles.liste}>
					{tilganger.map(t => <PersonListeElement fornavn={t.fornavn} mellomnavn={t.mellomnavn} etternavn={t.etternavn} key={t.id}/>)}
				</ul>
			</div>

			<div>
				<Link to={tilgangskontrollPageUrl(gjennomforingId!)} className="navds-button navds-button--secondary navds-button--medium">
					Tilgangskontroll
				</Link>
			</div>
		</section>
	)
}