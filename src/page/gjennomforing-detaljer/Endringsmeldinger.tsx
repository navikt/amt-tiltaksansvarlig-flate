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
	const endringsmeldinger = endringsmeldingerPromise.result?.data

	if (isNotStartedOrPending(endringsmeldingerPromise)) return <Loader/>
	if (isRejected(endringsmeldingerPromise)) return <Alert variant="error">En feil har oppstått</Alert>

	return <>
		{endringsmeldinger?.map(e =>
			<Endringsmelding endringsmelding={e} key={e.id}/>
		)}
	</>

}