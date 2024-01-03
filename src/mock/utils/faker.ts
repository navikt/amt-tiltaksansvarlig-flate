import faker from 'faker'

faker.locale = 'nb_NO'
faker.seed(22967183)

export const randomBetween = (min: number, max: number): number => {
	return faker.datatype.number({ min, max })
}

export const randomDistribution = <T>(p1: () => T, p2: () => T, p1Percent: number) => {
	const useP1 = randomBetween(0, 100) <= p1Percent
	return useP1 ? p1() : p2()
}

export const randomFnr = (): string => {
	const dag = randomBetween(1, 31)
	const mnd = randomBetween(1, 12)
	const ar = randomBetween(0, 99)
	const arhundre = randomBetween(0, 99).toString().padStart(2, '0')
	const kjonnsiffer = faker.datatype.boolean() ? 4 : 1
	const individsifre = `${arhundre}${kjonnsiffer}`
	const kontrollsifre = `${randomBetween(0, 9)}${randomBetween(0, 9)}`

	return `${dag.toString().padStart(2, '0')}${mnd.toString().padStart(2, '0')}${ar
		.toString()
		.padStart(2, '0')}${individsifre}${kontrollsifre}`
}
