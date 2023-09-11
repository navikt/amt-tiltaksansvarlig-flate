import { Alert, Tabs } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import cls from 'classnames'
import React, { useEffect, useState } from 'react'

import { fetchMmeldingerFraArrangor } from '../../api/api'
import { MeldingerFraArrangor as Meldinger } from '../../api/schema/meldinger'
import { Tiltakskode } from '../../api/schema/schema'
import { Spinner } from '../../component/spinner/Spinner'
import globalStyles from '../../globals.module.scss'
import { useDataStore } from '../../store/data-store'
import { harTilgangTilEndringsmelding } from '../../utils/tilgang-utils'
import { isNotStartedOrPending, isRejected, isResolved, usePromise } from '../../utils/use-promise'
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'
import styles from './GjennomforingDetaljerPage.module.scss'
import { Vurderinger } from './vurderinger/Vurderinger'

interface MeldingerFraArrangorProps {
	gjennomforingId: string
	tiltaksKode: Tiltakskode
}

export const MeldingerFraArrangor = ({ gjennomforingId, tiltaksKode }: MeldingerFraArrangorProps): React.ReactElement => {
	const { innloggetAnsatt } = useDataStore()
	const [ meldinger, setMeldinger ] = useState<Meldinger>({ endringsmeldinger: [], vurderinger: [] })
	const meldingerFraArrangorPromise = usePromise<AxiosResponse<Meldinger>>()
	const harTilgang = harTilgangTilEndringsmelding(innloggetAnsatt.tilganger)

	useEffect(() => {
		if (isResolved(meldingerFraArrangorPromise)) {
			setMeldinger(meldingerFraArrangorPromise.result.data)
		}
	}, [ meldingerFraArrangorPromise ])

	useEffect(() => {
		if (harTilgang) {
			meldingerFraArrangorPromise.setPromise(fetchMmeldingerFraArrangor(gjennomforingId))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ harTilgang ])

	const refresh = () => {
		meldingerFraArrangorPromise.setPromise(fetchMmeldingerFraArrangor(gjennomforingId))
	}

	const isLoading = isNotStartedOrPending(meldingerFraArrangorPromise)

	if (!harTilgang) {
		return (
			<Alert className={styles.errorAlert} variant="info" size="small">
				Du har ikke tilgang til å se endringsmeldinger.
			</Alert>
		)
	}

	if (isRejected(meldingerFraArrangorPromise)) {
		return (
			<Alert className={styles.errorAlert} variant="error" size="small">
				Klarte ikke å laste endringsmeldinger.
			</Alert>
		)
	}

	if(isLoading){
		return <Spinner />
	}

	return tiltaksKode === Tiltakskode.GRUPPEAMO ? (
		<Tabs defaultValue="endringsmeldinger" className={styles.tab}>
			<Tabs.List>
				<Tabs.Tab value="endringsmeldinger" label="Endringsmeldinger" />
				<Tabs.Tab value="vurderinger" label="Vurdering fra tiltaksarrangør" />
			</Tabs.List>
			<Tabs.Panel value="endringsmeldinger" className={styles.tabPanel}>
				<Endringsmeldinger gjennomforingId={gjennomforingId} endringsmeldinger={meldinger?.endringsmeldinger} refresh={refresh} />
			</Tabs.Panel>
			<Tabs.Panel value="vurderinger" className={styles.tabPanel}>
				<Vurderinger vurderinger={meldinger?.vurderinger} />
			</Tabs.Panel>
		</Tabs>
	) : (
		<>
			<div className={cls(styles.seperator, globalStyles.blokkL)} />
			<Endringsmeldinger gjennomforingId={gjennomforingId} endringsmeldinger={meldinger?.endringsmeldinger} refresh={refresh} />
		</>
	)
}
