import { useState } from 'react'

export enum DeferredFetchState {
	NOT_STARTED = 'NOT_STARTED',
	LOADING = 'LOADING',
	RESOLVED = 'RESOLVED',
	ERROR = 'ERROR'
}

interface UseDeferredFetch<T> {
	data: T | null,
	state: DeferredFetchState,
	error: string | null,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	doFetch: (...args: any[]) => Promise<T | null>
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFunction<T> = (...args: any[]) => Promise<T>

export const useDeferredFetch = <T>(apiFunction: ApiFunction<T>): UseDeferredFetch<T> => {
	const [ data, setData ] = useState<T | null>(null)
	const [ state, setState ] = useState<DeferredFetchState>(DeferredFetchState.NOT_STARTED)
	const [ error, setError ] = useState<string | null>(null)

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const doFetch = async(...args: any[]): Promise<T | null> => {
		try {
			setState(DeferredFetchState.LOADING)
			const result = await apiFunction(...args)
			setData(result)
			return result
		} catch (error) {
			setState(DeferredFetchState.ERROR)
			setError('An error occurred while fetching the data.')
			throw error
		} finally {
			setState(DeferredFetchState.RESOLVED)
		}
	}

	return { data, state, error, doFetch }
}
