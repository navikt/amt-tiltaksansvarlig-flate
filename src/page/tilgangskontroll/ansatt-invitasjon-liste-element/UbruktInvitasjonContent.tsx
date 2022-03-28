import React, { useEffect, useState } from 'react'
import styles from './AnsattInvitasjonListeElement.module.scss'
import globalStyles from '../../../globals.module.scss'
import { BodyShort, Button } from '@navikt/ds-react'
import { formatDate } from '../../../utils/date-utils'
import { opprettTilgangInvitasjonLenke } from '../../../utils/invitasjon-lenke-utils'
import cls from 'classnames'

interface UbruktInvitsjonContentProps {
	invitasjonId: string,
	opprettetDato: Date,
	gyldigTilDato: Date,
	onAvbrytInvitasjon: (tilgangId: string) => void,
}

const COPY_TOOLTIP_DURATION_MS = 1000

export const UbruktInvitsjonContent = (props: UbruktInvitsjonContentProps): React.ReactElement<UbruktInvitsjonContentProps> => {
	const { invitasjonId, opprettetDato, gyldigTilDato } = props

	const [ copySuccess, setCopySuccess ] = useState<boolean>(false)

	const invitasjonLenke = opprettTilgangInvitasjonLenke(invitasjonId)

	const writeToClipboard = (tekst: string): void => {
		navigator.clipboard.writeText(tekst)
			.then(() => setCopySuccess(true))
			.catch(() => setCopySuccess(false))
	}

	useEffect(() => {
		if (copySuccess) {
			const timeOutId = window.setTimeout(() => setCopySuccess(false), COPY_TOOLTIP_DURATION_MS)

			return () => clearTimeout(timeOutId)
		}
	}, [ copySuccess ])

	return (
		<div>
			<div className={cls(styles.ubruktInvitasjonTopContent, globalStyles.blokkXs)}>
				<BodyShort className={styles.bold} spacing>Ny koordinator</BodyShort>
				<Button
					type="button"
					variant="tertiary"
					onClick={() => props.onAvbrytInvitasjon(invitasjonId)}
				>
					Avbryt
				</Button>
			</div>

			<div className={styles.ubruktInvitasjonTopContent}>
				<BodyShort className={styles.bold} spacing>{invitasjonLenke}</BodyShort>

				<div style={{ position: 'relative' }}>
					<Button
						type="button"
						variant="secondary"
						onClick={() => writeToClipboard(invitasjonLenke)}
					>
						Kopier
					</Button>
					<span className={cls(styles.kopierKnappTooltip, { [styles.kopierKnappTooltipVisible]: copySuccess })}>
                        Kopiert
					</span>
				</div>
			</div>


			<ol className={styles.ubruktInvitasjonListe}>
				<li>Kopier denne lenken og send til koordinatoren hos tiltaksarrangør.</li>
				<li>
					Den ansatte hos tiltaksarrangøren logger seg inn med BankID. På denne måten får NAV sikker tilgang
					til deres fødselsnummer.
					Når koordinatoren har logget seg inn og bedt om tilgang, så vil det komme ny informasjon her.
				</li>
			</ol>

			<BodyShort className={styles.grayText}>
				Opprettet {formatDate(opprettetDato)} - Utløper {formatDate(gyldigTilDato)}
			</BodyShort>
		</div>

	)
}