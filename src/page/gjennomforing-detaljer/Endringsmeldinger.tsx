import React from 'react'
import { isNotStartedOrPending, isRejected, usePromise } from '../../utils/use-promise'
import { AxiosResponse } from 'axios'
import { Alert, Loader } from '@navikt/ds-react'
import { EndringsmeldingerType, fetchEndringsmeldinger } from '../../api/api'
import { Endringsmelding } from '../../component/Endringsmelding'

interface EndringsmeldingerPanelProps {
	gjennomforingId: string
}

export const Endringsmeldinger = ({ gjennomforingId }: EndringsmeldingerPanelProps) => {
	const endringsmeldingerPromise = usePromise<AxiosResponse<EndringsmeldingerType>>(() => fetchEndringsmeldinger(gjennomforingId!))

	if (isNotStartedOrPending(endringsmeldingerPromise)) return <Loader/>
	if (isRejected(endringsmeldingerPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	const endringsmeldinger = endringsmeldingerPromise.result?.data

	if(endringsmeldinger.length === 0)
		return <Alert variant="info" size="small">Det er ingen nye meldinger om deltakere.</Alert>

	return <>
		{endringsmeldinger.map(e =>
			<Endringsmelding endringsmelding={e} key={e.id}/>
		)}
	</>

}