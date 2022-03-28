import React from 'react'
import styles from './AnsattInvitasjonListeElement.module.scss'
import { BodyShort, Button } from '@navikt/ds-react'
import { lagKommaSeparertBrukerNavn } from '../../../utils/bruker-utils'
import { formatDate } from '../../../utils/date-utils'
import { Nullable } from '../../../utils/types'

interface BruktInvitasjonContentProps {
	invitasjonId: string,
	fornavn: string,
	mellomnavn: Nullable<string>,
	etternavn: string,
	fodselsnummer: string,
	tidspunktBrukt: Date,
	onAvbrytInvitasjon: (tilgangId: string) => void,
	onGodkjennInvitasjon: (tilgangId: string) => void,
}

export const BruktInvitsjonContent = (props: BruktInvitasjonContentProps) : React.ReactElement<BruktInvitasjonContentProps> => {
	const { invitasjonId, fornavn, mellomnavn, etternavn, fodselsnummer, tidspunktBrukt } = props

	return (
		<div>
			<BodyShort className={styles.bold}>{lagKommaSeparertBrukerNavn(fornavn, mellomnavn, etternavn)}</BodyShort>
			<BodyShort spacing>{fodselsnummer}</BodyShort>
			<BodyShort spacing>Bedt om tilgang: {formatDate(tidspunktBrukt)}</BodyShort>

			<BodyShort spacing>Skal denne personen ha tilgang?</BodyShort>
			<div className={styles.bruktInvitasjonValg}>
				<Button
					type="submit"
					variant="primary"
					onClick={() => props.onGodkjennInvitasjon(invitasjonId)}
				>
					Ja, gi tilgang
				</Button>

				<Button
					type="submit"
					variant="secondary"
					onClick={() => props.onGodkjennInvitasjon(invitasjonId)}
				>
					Nei, det er feil
				</Button>
			</div>
		</div>

	)
}