import constate from 'constate'
import { useState } from 'react'

import { InnloggetNavAnsatt } from '../api/api'

export const [ DataStoreProvider, useDataStore ] = constate((props: { initialInnloggetAnsatt: InnloggetNavAnsatt }) => {
	const [ innloggetAnsatt, setInnloggetAnsatt ] = useState<InnloggetNavAnsatt>(props.initialInnloggetAnsatt)

	return {
		innloggetAnsatt,
		setInnloggetAnsatt,
	}
})
