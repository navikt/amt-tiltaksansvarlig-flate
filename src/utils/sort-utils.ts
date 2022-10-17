export const sortAlphabetic = (s1: string, s2: string): number => {
	if (s1 === s2) return 0
	return s1 > s2 ? 1 : -1
}
