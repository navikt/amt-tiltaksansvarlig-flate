import { Heading } from '@navikt/ds-react'

import globalStyles from '../../../globals.module.scss'
import React from 'react'
import { GjennomforingType, TiltakType } from '../../../api/api'
import { sortAlphabetic } from '../../../utils/sort-utils'
import { GjennomforingPanel } from './gjennomforing-panel/GjennomforingPanel'
import { TomVisningPanel } from './tom-visning-panel/TomVisningPanel'

interface Props {
	gjennomforinger: GjennomforingType[]
}

export const GjennomforingListe = (props: Props): React.ReactElement => {
	return (
		<section>
			{props.gjennomforinger.length === 0
				? (<TomVisningPanel />)
				: (finnTiltakMedGjennomforinger(props.gjennomforinger)
					.sort((tg1, tg2) => sortAlphabetic(tg1.tiltak.navn, tg2.tiltak.navn))
					.map(tg => {
						return <GjennomforingGruppering
							tiltak={tg.tiltak}
							gjennomforinger={tg.gjennomforinger}
							key={tg.tiltak.kode}
						/>
					}))
			}
		</section>
	)
}

interface TiltakMedGjennomforinger {
	tiltak: TiltakType
	gjennomforinger: GjennomforingType[]
}

const finnTiltakMedGjennomforinger = (gjennomforinger: GjennomforingType[]): TiltakMedGjennomforinger[] => {
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


const GjennomforingGruppering = (props: TiltakMedGjennomforinger): React.ReactElement => {
	return (
		<div className={globalStyles.blokkM}>
			<Heading size="xsmall" level="2">{props.tiltak.navn}</Heading>
			{
				props.gjennomforinger
					.sort((g1, g2) => sortAlphabetic(g1.tiltak.navn, g2.tiltak.navn))
					.map(gjennomforing => <GjennomforingPanel gjennomforing={gjennomforing} key={gjennomforing.id} />)
			}
		</div>
	)
}
