import React from 'react'
import { Accordion, Alert, BodyLong, Heading } from '@navikt/ds-react'
import styles from '../Endringsmeldinger.module.scss'
import { useLagretVarighet } from '../endringsmelding/useLagretVarighet'
import { VarighetSelect } from '../endringsmelding/VarighetSelect'
import { sorterEndringsmeldingNyestFørst } from '../utils'
import { EndringsmeldingStatus, Endringsmelding } from '../../../../api/schema/endringsmelding'
import { EndringsmeldingPanel } from '../endringsmelding/EndringsmeldingPanel'

const DEFAULT_VARIGHET_MANEDER = null

interface MeldingerProps {
	gjennomforingId: string,
	meldinger: Endringsmelding[]
	refresh: () => void
}

export const EndringsmeldingListe = ({
	gjennomforingId,
	meldinger,
	refresh,
}: MeldingerProps) => {
	const [ varighet, setVarighet ] = useLagretVarighet(gjennomforingId, DEFAULT_VARIGHET_MANEDER)
	const aktiveMeldinger = meldinger.filter(e => e.status === EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldingNyestFørst)
	const inaktiveMeldinger = meldinger.filter(e => e.status !== EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldingNyestFørst)

	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Oppstartsdato</Heading>
			<BodyLong size="small">
				Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker kommer det en ny melding her.
				For å få forslag til en sluttdato kan du velge en varighet nedenfor. Datoene skal legges inn i Arena.
			</BodyLong>
			<VarighetSelect selectedValue={varighet} setVarighet={setVarighet} />
			{aktiveMeldinger.length > 0
				? aktiveMeldinger.map(m => <EndringsmeldingPanel endringsmelding={m} onFerdig={refresh} varighet={varighet} />)
				: <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
			}
			<Accordion className={styles.spaceTop}>
				<Accordion.Item>
					<Accordion.Header className={styles.accordionHeader}>
						Meldinger som er markert ferdig
					</Accordion.Header>
					<Accordion.Content className={styles.accordionContent}>
						{inaktiveMeldinger.length > 0
							? inaktiveMeldinger.map(m => <EndringsmeldingPanel endringsmelding={m} onFerdig={refresh} varighet={varighet} />)
							: <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
						}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</div>
	)
}
