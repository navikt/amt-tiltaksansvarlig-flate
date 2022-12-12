import React from 'react'

import { InnloggetNavAnsatt } from '../api/api'
import { DataStoreProvider } from './data-store'

interface StoreProviderProps {
	innloggetAnsatt: InnloggetNavAnsatt
	children: React.ReactNode
}

const StoreProvider = (props: StoreProviderProps): React.ReactElement<StoreProviderProps> => {
	return (
		<DataStoreProvider initialInnloggetAnsatt={props.innloggetAnsatt}>
			{props.children}
		</DataStoreProvider>
	)
}

export default StoreProvider
