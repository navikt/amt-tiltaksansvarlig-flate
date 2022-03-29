import { Nullable } from './types'

const formaterNavnCasing = (navn: string): string => {
	let nyttNavn = ''
	let nextCharIsUppercase = true

	for (let i = 0; i < navn.length; i++) {
		const curChar = navn.charAt(i)

		if (nextCharIsUppercase) {
			nyttNavn += curChar.toUpperCase()
			nextCharIsUppercase = false
		} else {
			nyttNavn += curChar.toLowerCase()
		}

		if (curChar === '-' || curChar === ' ') {
			nextCharIsUppercase = true
		}
	}

	return nyttNavn
}

// Lager navn på format: <fornavn> <mellomnavn> <etternavn>
export const lagBrukerNavn = (fornavn: string, mellomnavn: Nullable<string>, etternavn: string): string => {
	return [
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined,
		formaterNavnCasing(etternavn)
	].filter(navn => !!navn).join(' ')
}

// Lager navn på format: <etternavn>, <fornavn> <mellomnavn>
export const lagKommaSeparertBrukerNavn = (fornavn: string, mellomnavn: Nullable<string>, etternavn: string): string => {
	return [
		formaterNavnCasing(etternavn) + ',',
		formaterNavnCasing(fornavn),
		mellomnavn ? formaterNavnCasing(mellomnavn) : undefined
	].filter(navn => !!navn).join(' ')
}
