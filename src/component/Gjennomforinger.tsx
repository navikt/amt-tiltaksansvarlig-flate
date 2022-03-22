import { Alert, Heading, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { axiosInstance } from '../api/utils'
import { appUrl } from '../utils/url-utils'
import { isNotStartedOrPending, isRejected, usePromise } from '../utils/use-promise'
import { GjennomforingPanel } from './GjennomforingPanel'

export interface Gjennomforing {
	navn: string,
	id: string
}

export const Gjennomforinger = () : React.ReactElement => {
	const getGjennomforingPromise = usePromise<AxiosResponse<Gjennomforing[]>>(() => axiosInstance.get(appUrl('/gjennomforinger')))
	const gjennomforinger = getGjennomforingPromise.result?.data

	if (isNotStartedOrPending(getGjennomforingPromise)) return <Loader />

	if (isRejected(getGjennomforingPromise)) return <Alert variant="error">Noe gikk galt: ${getGjennomforingPromise.error}</Alert>

	return <>
		<Heading size="xsmall">Oppfølging</Heading>
		{gjennomforinger?.map(gjennomforing => <GjennomforingPanel gjennomforing={gjennomforing} key={gjennomforing.id}/>)}
	</>
}