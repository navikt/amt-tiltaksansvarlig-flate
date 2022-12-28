import { AxiosError } from 'axios'

export const getStatusCode = (error: Error): number | undefined => {
	const err: AxiosError = error as AxiosError
	return err.response?.status

}
