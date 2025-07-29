import { useEffect, useState } from 'react'

import { ApiResponse } from '../api/api'

interface UseFetchResult<T> {
	data: T | null
	loading: boolean
	error: string | null
	statusCode: number | null
	reload: () => void
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiFunction<ApiResponse> = (...args: any[]) => Promise<ApiResponse>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useFetch = <T>(apiFunction: ApiFunction<ApiResponse<T>>, ...args: any[]): UseFetchResult<T> => {
	const [ data, setData ] = useState<T | null>(null)
	const [ loading, setLoading ] = useState<boolean>(true)
	const [ error, setError ] = useState<string | null>(null)
	const [ statusCode, setStatusCode ] = useState<number | null>(null)

	const fetchData = async() => {
		await apiFunction(...args)
			.then(result => {
				setStatusCode(result.statusCode)
				setData(result.data)
				if (result.statusCode !== 200) {
					throw Error(`Fikk statuskode ${result.statusCode}`)
				}
			})
			.catch(error => {
				setError('An error occurred while fetching the data.')
				throw error
			})
			.finally(() => setLoading(false))
	}

	const reload = () => {
		setLoading(true)
		fetchData()
	}

	useEffect(() => {
		fetchData()
	}, [ apiFunction, ...args ])

	return { data, loading, error, reload, statusCode }
}

export default useFetch
