import React from 'react'

import { DataStoreProvider } from './data-store'
import { InnloggetNavAnsatt } from '../api/api'

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
