import { Tag } from '@navikt/ds-react'
import React from 'react'

import { Adressebeskyttelse } from '../api/schema/meldinger'
import styles from './WarningGroup.module.scss'

interface Props {
	erSkjermet: boolean,
	adressebeskyttelser: (Adressebeskyttelse | null)[],
}

export function WarningGroup({ erSkjermet, adressebeskyttelser }: Props) {
	const tags: string[] = adressebeskyttelser.filter(a => a !== null)
		.map(adressebeskyttelse => {
			const prefix = 'Adressebeskyttet'

			switch (adressebeskyttelse) {
				case Adressebeskyttelse.FORTROLIG:
					return `${prefix} fortrolig`
				case Adressebeskyttelse.STRENGT_FORTROLIG:
					return `${prefix} strengt fortrolig`
				case Adressebeskyttelse.STRENGT_FORTROLIG_UTLAND:
					return `${prefix} strengt fortrolig utland`
				default: {
					const uventetAdressebeskyttelse: never | null = adressebeskyttelse
					throw new Error(`Uventet adressebeskyttelse: ${uventetAdressebeskyttelse}`)
				}
			}
		})

	if (erSkjermet) {
		tags.push('Skjermet')
	}

	if (tags.length === 0) return null

	return (
		<div className={styles.group}>
			{tags.map(t => <Tag size="small" variant="warning" key={t}>{t}</Tag>)}
		</div>
	)

}

