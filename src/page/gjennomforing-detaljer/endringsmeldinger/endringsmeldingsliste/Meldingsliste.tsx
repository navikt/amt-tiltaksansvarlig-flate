import React from 'react'
import { Accordion, Alert } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import { Spinner } from '../../../../component/spinner/Spinner'
import { isNotStartedOrPending, isRejected, UsePromise } from '../../../../utils/use-promise'
import styles from '../Endringsmeldinger.module.scss'

interface MeldingslisteProps {
	endringsmeldingerPromise: UsePromise<AxiosResponse>
	aktiveMeldingerVisning: React.ReactNode
	inaktiveMeldingerVisning: React.ReactNode
}

export const Meldingsliste = (props: MeldingslisteProps) => {
	const endringsmeldingerPromise = props.endringsmeldingerPromise
	return (
		<>
			{
				isNotStartedOrPending(endringsmeldingerPromise)
					? <Spinner />
					: props.aktiveMeldingerVisning
			}

			{isRejected(endringsmeldingerPromise) && <Alert variant="error">En feil har oppstått</Alert>}

			<Accordion className={styles.spaceTop}>
				<Accordion.Item>
					<Accordion.Header className={styles.accordionHeader}>
						Meldinger som er markert ferdig
					</Accordion.Header>
					<Accordion.Content className={styles.accordionContent}>
						{
							isNotStartedOrPending(endringsmeldingerPromise)
								? <Spinner />
								: props.inaktiveMeldingerVisning
						}
					</Accordion.Content>
				</Accordion.Item>
			</Accordion>
		</>
	)
}
