import { Alert } from '@navikt/ds-react'
import React, { ReactElement } from 'react'

import styles from '../page/gjennomforing-detaljer/GjennomforingDetaljerPage.module.scss'
import { useDataStore } from '../store/data-store'

interface Props {
	children: ReactElement
}

export const HasTilgangGuard = ({ children }: Props) => {
	const { innloggetAnsatt } = useDataStore()

	const TILGANG_ENDRINGSMELDING = 'ENDRINGSMELDING'
	const harTilgang = innloggetAnsatt.tilganger.includes(TILGANG_ENDRINGSMELDING)

	if (!harTilgang) {
		return (
			<Alert className={styles.errorAlert} variant="info" size="small">
				Du har ikke tilgang til å se endringsmeldinger.
			</Alert>
		)
	}

	return (
		<>
			{children}
		</>
	)
}
