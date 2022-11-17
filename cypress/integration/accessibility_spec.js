import { logViolations } from '../log-utils'
/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { innloggetAnsatt } = require('../../src/mock/data')

function sjekkUU() {
	cy.injectAxe()
	// Vi får SVGer fra @navikt/ds-icons som mangler "title", dette er ikke et problem siden ikonene ikke er viktige for innholdet
	cy.checkA11y(null, { rules: { 'svg-img-alt': { enabled: false } } }, logViolations)
}

function initialize() {
	// Mockes som work around på problem hvor kallet alltid returnerer 404 i første test
	// Alternativt kan man kalle visit en ekstra gang på starten og i tillegg finne en måte å vente på at netverkskall skal fullføre
	cy.intercept('/amt-tiltak/api/nav-ansatt/autentisering/meg', innloggetAnsatt)
}

function gaTilForside() {
	cy.visit('/')
	cy.screenshot('visit-forside-done')
	cy.get('[data-testid=innlogget-header]', { timeout: 20_000 })
	cy.screenshot('found-innlogget-header')
	cy.get('[data-testid=forside-page]', { timeout: 20_000 })
	cy.screenshot()
}

function navigerTilLeggTilGjennomforing() {
	cy.get('[data-testid=legg-til-gjennomforing-link]').click()
	cy.get('[data-testid=legg-til-gjennomforing-page]')
}

function navigerTilGjennomforingDetaljer() {
	cy.get('.navds-link-panel')
		.first()
		.click()

	cy.get('[data-testid=gjennomforing-detaljer-page]')
}
describe('Cypress+Axe accessibility tests', () => {
	it('"Forside" skal oppfylle UU-krav', () => {
		//cy.wait(60_000)
		initialize()
		gaTilForside()

		sjekkUU()
	})

	it('"Legg til gjennomføring" skal oppfylle UU-krav', () => {
		gaTilForside()
		navigerTilLeggTilGjennomforing()

		sjekkUU()
	})

	it('"Gjennomføring detaljer" skal oppfylle UU-krav', () => {
		gaTilForside()
		navigerTilGjennomforingDetaljer()

		sjekkUU()
	})
})
