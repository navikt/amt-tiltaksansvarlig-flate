import React from 'react'
import { Accordion } from '@navikt/ds-react'
import styles from '../Endringsmeldinger.module.scss'

interface MeldingslisteProps {
	aktiveMeldingerVisning: React.ReactNode
	inaktiveMeldingerVisning: React.ReactNode
}

export const Meldingsliste = (props: MeldingslisteProps) => {
	return (
		<>
			{props.aktiveMeldingerVisning}

			<Accordion className={styles.spaceTop}>
				<Accordion.Item>
					<Accordion.Header className={styles.accordionHeader}>
						Meldinger som er markert ferdig
					</Accordion.Header>
					<Accordion.Content className={styles.accordionContent}>
						{props.inaktiveMeldingerVisning}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</>
	)
}
