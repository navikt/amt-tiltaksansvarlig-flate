import React from 'react'
import { Accordion, Alert, BodyLong, Heading } from '@navikt/ds-react'
import styles from '../Endringsmeldinger.module.scss'
import { useLagretVarighetValg } from '../endringsmelding/useLagretVarighetValg'
import { VarighetSelect, VarighetValg } from '../endringsmelding/VarighetSelect'
import { sorterEndringsmeldinger } from '../utils'
import { EndringsmeldingStatus, Endringsmelding } from '../../../../api/schema/endringsmelding'
import { EndringsmeldingPanel } from '../endringsmelding/EndringsmeldingPanel'

const DEFAULT_VARIGHET_VALG = VarighetValg.IKKE_VALGT

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
	const [ varighetValg, setVarighetValg ] = useLagretVarighetValg(gjennomforingId, DEFAULT_VARIGHET_VALG)
	const aktiveMeldinger = meldinger.filter(e => e.status === EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldinger)
	const inaktiveMeldinger = meldinger.filter(e => e.status !== EndringsmeldingStatus.AKTIV).sort(sorterEndringsmeldinger)
	return (
		<div className={styles.spaceBottom}>
			<Heading size="small" level="3" spacing>Oppstartsdato</Heading>
			<BodyLong size="small">
				Når tiltaksarrangøren oppdaterer oppstartsdatoen til en deltaker kommer det en ny melding her.
				For å få forslag til en sluttdato kan du velge en varighet nedenfor. Datoene skal legges inn i Arena.
			</BodyLong>
			<VarighetSelect varighetValg={varighetValg} setVarighetValg={setVarighetValg} />
			{aktiveMeldinger.length > 0
				? aktiveMeldinger.map(m => {
					return <EndringsmeldingPanel
						endringsmelding={m}
						onFerdig={refresh}
						varighetValg={varighetValg}
						key={m.id}
					/>
				})
				: <Alert variant="info" size="small" inline>Det er ingen nye endringsmeldinger.</Alert>
			}
			<Accordion className={styles.spaceTop}>
				<Accordion.Item>
					<Accordion.Header className={styles.accordionHeader}>
						Meldinger som er markert ferdig
					</Accordion.Header>
					<Accordion.Content className={styles.accordionContent}>
						{inaktiveMeldinger.length > 0
							? inaktiveMeldinger.map(m => {
								return <EndringsmeldingPanel
									endringsmelding={m}
									onFerdig={refresh}
									varighetValg={varighetValg}
									key={m.id}
								/>
							})
							: <Alert variant="info" size="small">Ingen meldinger har blitt markert som ferdig</Alert>
						}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</div>
	)
}
