import { Heading } from '@navikt/ds-react'
import React, { useEffect } from 'react'

import { Gjennomforing, Tiltak } from '../../../api/api'
import globalStyles from '../../../globals.module.scss'
import { sortAlphabetic } from '../../../utils/sort-utils'
import { GjennomforingPanel } from './gjennomforing-panel/GjennomforingPanel'
import { TomVisningPanel } from './tom-visning-panel/TomVisningPanel'

interface Props {
	gjennomforinger: Gjennomforing[]
}

export const GjennomforingListe = (props: Props): React.ReactElement => {
	const handleClick = () => {
		sessionStorage.setItem('scrollPosition', JSON.stringify(window.scrollY))
	}

	useEffect(() => {
		const scrollPosition = sessionStorage.getItem('scrollPosition')
		if (scrollPosition) {
			window.scrollTo(0, JSON.parse(scrollPosition))
			sessionStorage.removeItem('scrollPosition')
		}
	}, [])

	return (
		<section>
			{props.gjennomforinger.length === 0 ? (
				<TomVisningPanel />
			) : (
				finnTiltakMedGjennomforinger(props.gjennomforinger)
					.sort((tg1, tg2) => sortAlphabetic(tg1.tiltak.navn, tg2.tiltak.navn))
					.map((tg) => {
						return <GjennomforingGruppering tiltak={tg.tiltak} gjennomforinger={tg.gjennomforinger} key={tg.tiltak.kode} onClick={handleClick} />
					})
			)}
		</section>
	)
}

interface TiltakMedGjennomforinger {
	tiltak: Tiltak
	gjennomforinger: Gjennomforing[]
}

const finnTiltakMedGjennomforinger = (gjennomforinger: Gjennomforing[]): TiltakMedGjennomforinger[] => {
	const tiltakMap: { [k: string]: TiltakMedGjennomforinger } = {}
	gjennomforinger.forEach(g => {
		if (tiltakMap[g.tiltak.kode]) {
			tiltakMap[g.tiltak.kode].gjennomforinger.push(g)
		} else {
			tiltakMap[g.tiltak.kode] = { tiltak: g.tiltak, gjennomforinger: [ g ] }
		}
	})
	return Object.values(tiltakMap)
}


interface GjennomforingGrupperingProps {
	tiltak: Tiltak
	gjennomforinger: Gjennomforing[]
	onClick: () => void
}

const GjennomforingGruppering = (props: GjennomforingGrupperingProps): React.ReactElement => {
	return (
		<div className={globalStyles.blokkM}>
			<Heading size="xsmall" level="2">
				{props.tiltak.navn}
			</Heading>
			{props.gjennomforinger
				.sort((g1, g2) => sortAlphabetic(g1.navn, g2.navn))
				.map((gjennomforing) => (
					<GjennomforingPanel onClick={props.onClick} gjennomforing={gjennomforing} key={gjennomforing.id} />
				))}
		</div>
	)
}
