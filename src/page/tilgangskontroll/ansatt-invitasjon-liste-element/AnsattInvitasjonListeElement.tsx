import React from 'react'
import { Alert, Panel } from '@navikt/ds-react'
import styles from './AnsattInvitasjonListeElement.module.scss'
import { AnsattTilgangInvitasjon } from '../../../api/api'
import { InvitasjonStatus } from '../../../api/schema'
import { BruktInvitsjonContent } from './BruktInvitasjonContent'
import { UbruktInvitsjonContent } from './UbruktInvitasjonContent'

interface AnsattInvitasjonListeElementProps {
	ansattInvitasjon: AnsattTilgangInvitasjon
	onAksepterInvitasjon: (tilgangId: string) => void
	onAvbrytInvitasjon: (tilgangId: string) => void
}

export const AnsattInvitasjonListeElement = (props: AnsattInvitasjonListeElementProps) : React.ReactElement<AnsattInvitasjonListeElementProps> => {
	const { id, invitertAnsatt, tidspunktBrukt, opprettetDato, gyldigTilDato, status } = props.ansattInvitasjon

	let content

	if (status === InvitasjonStatus.BRUKT) {
		content = (
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
	} else if (status === InvitasjonStatus.UBRUKT) {
		content = (
			<UbruktInvitsjonContent
				invitasjonId={id}
				opprettetDato={opprettetDato ?? new Date()}
				gyldigTilDato={gyldigTilDato ?? new Date()}
				onAvbrytInvitasjon={props.onAvbrytInvitasjon}
			/>
		)
	} else {
		content = (<Alert variant="error">Noe gikk galt</Alert>)
	}

	return (
		<li className={styles.listItem}>
			<Panel className={styles.panel}>
				{content}
			</Panel>
		</li>
	)
}