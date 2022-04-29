import React, { useEffect, useState } from 'react'
import { BodyShort, Button } from '@navikt/ds-react'
import styles from './TilgangInvitasjon.module.scss'
import cls from 'classnames'
import globalStyles from '../../../../globals.module.scss'
import { UbruktTilgangInvitasjonType } from '../../../../api/api'
import { opprettTilgangInvitasjonLenke } from '../../../../utils/invitasjon-lenke-utils'
import { formatDate } from '../../../../utils/date-utils'

interface TilgangInvitasjonProps {
	invitasjon: UbruktTilgangInvitasjonType
	onAvbrytInvitasjon: (invitasjonId: string) => void
}

const COPY_TOOLTIP_DURATION_MS = 1000

export const TilgangInvitasjon = (props: TilgangInvitasjonProps): React.ReactElement<TilgangInvitasjonProps> => {
	const { id, opprettetDato, gyldigTilDato } = props.invitasjon

	const [ copySuccess, setCopySuccess ] = useState<boolean>(false)

	const invitasjonLenke = opprettTilgangInvitasjonLenke(id)

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
			<div className={cls(styles.top, globalStyles.blokkXs)}>
				<BodyShort className={styles.bold} spacing>Ny koordinator</BodyShort>
				<Button
					type="button"
					variant="tertiary"
					onClick={() => props.onAvbrytInvitasjon(id)}
				>
					Avbryt
				</Button>
			</div>

			<div className={cls(styles.top, globalStyles.blokkM)}>
				<BodyShort className={cls(styles.bold, styles.break)} spacing>{invitasjonLenke}</BodyShort>

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


			<ol className={styles.liste}>
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