import { lagBrukerNavn, lagKommaSeparertBrukerNavn } from './bruker-utils'

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

describe('lagBrukerNavn', () => {
	test('skal lage riktig navn', () => {
		expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN')).toEqual('Test Testersen')
		expect(lagBrukerNavn('TEST', 'TESTINGTON', 'TESTERSEN')).toEqual('Test Testington Testersen')
	})

	test('skal lage riktig navn når navn har stor forbokstav', () => {
		expect(lagBrukerNavn('Test', undefined, 'Testersen')).toEqual('Test Testersen')
		expect(lagBrukerNavn('Test', 'Testington', 'Testersen')).toEqual('Test Testington Testersen')
	})

	test('skal lage riktig navn når navn har mellomrom', () => {
		expect(lagBrukerNavn('TEST TESTER', undefined, 'TESTERSEN')).toEqual('Test Tester Testersen')
		expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN TESTERSON')).toEqual('Test Testersen Testerson')
	})

	test('skal lage riktig navn når navn har bindestrek', () => {
		expect(lagBrukerNavn('TEST-TESTER', undefined, 'TESTERSEN')).toEqual('Test-Tester Testersen')
		expect(lagBrukerNavn('TEST', undefined, 'TESTERSEN-TESTERSON')).toEqual('Test Testersen-Testerson')
	})
})
