import { lagKommaSeparertBrukerNavn } from './bruker-utils'

describe('lagKommaSeparertBrukerNavn', () => {
	test('skal lage riktig navn når navn er uppercase', () => {
		expect(lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN')).toEqual('Testersen, Test')
		expect(lagKommaSeparertBrukerNavn('TEST', 'TESTINGTON', 'TESTERSEN')).toEqual('Testersen, Test Testington')
	})

	test('skal lage riktig navn når navn har stor forbokstav', () => {
		expect(lagKommaSeparertBrukerNavn('Test', undefined, 'Testersen')).toEqual('Testersen, Test')
		expect(lagKommaSeparertBrukerNavn('Test', 'Testington', 'Testersen')).toEqual('Testersen, Test Testington')
	})

	test('skal lage riktig navn når navn har mellomrom', () => {
		expect(lagKommaSeparertBrukerNavn('TEST TESTER', undefined, 'TESTERSEN')).toEqual('Testersen, Test Tester')
		expect(lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN TESTERSON')).toEqual('Testersen Testerson, Test')
	})

	test('skal lage riktig navn når navn har bindestrek', () => {
		expect(lagKommaSeparertBrukerNavn('TEST-TESTER', undefined, 'TESTERSEN')).toEqual('Testersen, Test-Tester')
		expect(lagKommaSeparertBrukerNavn('TEST', undefined, 'TESTERSEN-TESTERSON')).toEqual('Testersen-Testerson, Test')
	})
})
