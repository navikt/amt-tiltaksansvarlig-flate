import constate from 'constate'
import { useState } from 'react'
import { InnloggetNavAnsattType } from '../api/api'

export const [ DataStoreProvider, useDataStore ] = constate((props: {initialInnloggetAnsatt: InnloggetNavAnsattType}) => {
	const [ innloggetAnsatt, setInnloggetAnsatt ] = useState<InnloggetNavAnsattType>(props.initialInnloggetAnsatt)

	return {
		innloggetAnsatt,
		setInnloggetAnsatt,
	}
})