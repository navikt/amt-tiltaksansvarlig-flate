import { Alert, Heading, Loader } from '@navikt/ds-react'
import { AxiosResponse } from 'axios'
import React from 'react'

import { fetchGjennomforinger, Gjennomforinger } from '../api/api'
import { isNotStartedOrPending, isRejected, usePromise } from '../utils/use-promise'
import { GjennomforingPanel } from './GjennomforingPanel'

export const GjennomforingListe = () : React.ReactElement => {
	const getGjennomforinger = usePromise<AxiosResponse<Gjennomforinger>>(fetchGjennomforinger)
	const gjennomforinger = getGjennomforinger.result?.data

	if (isNotStartedOrPending(getGjennomforinger)) return <Loader />

	if (isRejected(getGjennomforinger)) return <Alert variant="error">Noe gikk galt</Alert>

	return <>
		<Heading size="xsmall">Oppfølging</Heading>
		{gjennomforinger?.map(gjennomforing => <GjennomforingPanel gjennomforing={gjennomforing} key={gjennomforing.id}/>)}
	</>
}