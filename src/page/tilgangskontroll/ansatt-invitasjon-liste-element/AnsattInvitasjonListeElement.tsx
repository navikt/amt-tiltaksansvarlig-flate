import React from 'react'
import { Panel } from '@navikt/ds-react'
import styles from './AnsattInvitasjonListeElement.module.scss'
import { AnsattTilgangInvitasjon } from '../../../api/api'
import { BruktInvitsjonContent } from './BruktInvitasjonContent'
import { UbruktInvitsjonContent } from './UbruktInvitasjonContent'

interface AnsattInvitasjonListeElementProps {
	ansattInvitasjon: AnsattTilgangInvitasjon
	onAksepterInvitasjon: (tilgangId: string) => void
	onAvbrytInvitasjon: (tilgangId: string) => void
}

export const AnsattInvitasjonListeElement = (props: AnsattInvitasjonListeElementProps): React.ReactElement<AnsattInvitasjonListeElementProps> => {
	const { id, invitertAnsatt, tidspunktBrukt, opprettetDato, gyldigTilDato, erBrukt } = props.ansattInvitasjon

	const content = erBrukt
		? (
			<BruktInvitsjonContent
				invitasjonId={id}
				fornavn={invitertAnsatt?.fornavn ?? ''}
				mellomnavn={invitertAnsatt?.mellomnavn}
				etternavn={invitertAnsatt?.etternavn ?? ''}
				fodselsnummer={invitertAnsatt?.fodselsnummer ?? ''}
				tidspunktBrukt={tidspunktBrukt ?? new Date()}
				onAksepterInvitasjon={props.onAksepterInvitasjon}
				onAvbrytInvitasjon={props.onAvbrytInvitasjon}
			/>
		)
		: (
			<UbruktInvitsjonContent
				invitasjonId={id}
				opprettetDato={opprettetDato ?? new Date()}
				gyldigTilDato={gyldigTilDato ?? new Date()}
				onAvbrytInvitasjon={props.onAvbrytInvitasjon}
			/>
		)

	return (
		<li className={styles.listItem}>
			<Panel className={styles.panel}>
				{content}
			</Panel>
		</li>
	)
}