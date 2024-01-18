import { Alert, Tabs } from '@navikt/ds-react'
import cls from 'classnames'
import React from 'react'

import { fetchMeldingerFraArrangor } from '../../api/api'
import { Tiltakskode } from '../../api/schema/schema'
import { Spinner } from '../../component/spinner/Spinner'
import globalStyles from '../../globals.module.scss'
import useFetch from '../../hooks/useFetch'
import { Endringsmeldinger } from './endringsmeldinger/Endringsmeldinger'
import styles from './GjennomforingDetaljerPage.module.scss'
import { Vurderinger } from './vurderinger/Vurderinger'

interface MeldingerFraArrangorProps {
	gjennomforingId: string
	tiltaksKode: Tiltakskode
}

export const MeldingerFraArrangor = ({ gjennomforingId, tiltaksKode }: MeldingerFraArrangorProps): React.ReactElement => {

	const {
		data: meldinger,
		loading,
		error,
		reload
	} = useFetch(fetchMeldingerFraArrangor, gjennomforingId)

	if (loading) {
		return <Spinner/>
	}

	if (error || !meldinger) {
		return (
			<Alert className={styles.errorAlert} variant="error" size="small">
				Klarte ikke å laste endringsmeldinger.
			</Alert>
		)
	}

	const antallVurderinger = meldinger?.vurderinger ? meldinger?.vurderinger.length : 0

	return tiltaksKode === Tiltakskode.GRUPPEAMO ? (
		<Tabs defaultValue="endringsmeldinger" className={styles.tab}>
			<Tabs.List>
				<Tabs.Tab value="endringsmeldinger" label="Endringsmeldinger"/>
				<Tabs.Tab value="vurderinger" label={`Vurdering fra tiltaksarrangør (${antallVurderinger})`}/>
			</Tabs.List>
			<Tabs.Panel value="endringsmeldinger" className={styles.tabPanel}>
				<Endringsmeldinger gjennomforingId={gjennomforingId} endringsmeldinger={meldinger?.endringsmeldinger}
					refresh={reload}/>
			</Tabs.Panel>
			<Tabs.Panel value="vurderinger" className={styles.tabPanel}>
				<Vurderinger vurderinger={meldinger?.vurderinger}/>
			</Tabs.Panel>
		</Tabs>
	) : (
		<>
			<div className={cls(styles.seperator, globalStyles.blokkL)}/>
			<Endringsmeldinger gjennomforingId={gjennomforingId} endringsmeldinger={meldinger?.endringsmeldinger}
				refresh={reload}/>
		</>
	)
}
