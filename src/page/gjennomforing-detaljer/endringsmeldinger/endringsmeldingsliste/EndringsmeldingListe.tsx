import { Accordion, Alert, BodyLong } from '@navikt/ds-react'
import React from 'react'

import { Endringsmelding,EndringsmeldingStatus } from '../../../../api/schema/endringsmelding'
import { EndringsmeldingPanel } from '../endringsmelding/EndringsmeldingPanel'
import { useLagretVarighetValg } from '../endringsmelding/useLagretVarighetValg'
import { VarighetSelect, VarighetValg } from '../endringsmelding/VarighetSelect'
import styles from '../Endringsmeldinger.module.scss'
import { sorterEndringsmeldinger } from '../utils'

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
			<BodyLong size="small">
				Når tiltaksarrangøren sender en melding om en endring til en deltaker, så kommer det en ny melding her. 
				Hvis det er en melding om oppstartsdato, så kan du velge varighet og få opp et forslag om sluttdato. 
				Datoene legges inn i Arena.
			</BodyLong>
			<VarighetSelect varighetValg={varighetValg} setVarighetValg={setVarighetValg} />
			{aktiveMeldinger.length > 0
				? aktiveMeldinger.map(endringsmelding => {
					return <EndringsmeldingPanel
						endringsmelding={endringsmelding}
						onFerdig={refresh}
						varighetValg={varighetValg}
						key={endringsmelding.id}
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
