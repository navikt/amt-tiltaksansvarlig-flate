import React from 'react'

import { DataStoreProvider } from './data-store'
import { InnloggetNavAnsattType } from '../api/api'

interface StoreProviderProps {
	innloggetAnsatt: InnloggetNavAnsattType
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
