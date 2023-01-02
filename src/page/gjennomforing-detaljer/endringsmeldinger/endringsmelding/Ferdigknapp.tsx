import { BodyShort, Button } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { markerEndringsmeldingSomFerdig } from '../../../../api/api'
import { isNotStarted, isPending, usePromise } from '../../../../utils/use-promise'
import styles from './Endringsmelding.module.scss'

interface FerdigKnappProps {
	inaktiv: boolean,
	skalSkjules: boolean,
	endringsmeldingId: string

}

export const FerdigKnapp = ({ inaktiv, skalSkjules, endringsmeldingId }: FerdigKnappProps) => {
	const markerSomFerdigPromise = usePromise<AxiosResponse>()
	const handleOnFerdigClicked = () => {
		markerSomFerdigPromise.setPromise(markerEndringsmeldingSomFerdig(endringsmeldingId))
	}

	if (inaktiv) return (
		<BodyShort className={styles.gray}>Ferdig</BodyShort>
	)

	if (skalSkjules) return null

	return (
		<Button
			size="small"
			onClick={handleOnFerdigClicked}
			disabled={!isNotStarted(markerSomFerdigPromise)}
			loading={isPending(markerSomFerdigPromise)}
		>
			Ferdig
		</Button>
	)


}