/* eslint-disable no-undef */
/* eslint-disable indent */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const table = require('table').table

const tableConfig = {
    columns: {
        0: {
            width: 90
        }
    }
}

function toViolationTableStr(violations) {
    const violationData = violations.map(violation => {
            const { id, impact, description, nodes, help, helpUrl  } = violation;

            const targetsStr = `${nodes.map(n => `\n    Location: ${n.target}\n    Source: ${n.html}`).join('\n    ==========\n')}`;

            let descriptionStr = ''
            descriptionStr += `Id: ${id}\n\n`
            descriptionStr += `Impact: ${impact}\n\n`
            descriptionStr += `Description: ${description}\n\n`
            descriptionStr += `Targets: ${targetsStr}\n\n`
            descriptionStr += `Help: ${help}\n`
            descriptionStr += `${helpUrl}`

            return [ descriptionStr ]
        }
    )

    const violationsWithHeader = [
        [ 'ACCESSIBILITY VIOLATIONS' ],
        ...violationData
    ]

    return table(violationsWithHeader, tableConfig);
}

function logViolations(violations) {
    cy.task('log', `\n${toViolationTableStr(violations)}\n`)
}

function sjekkUU() {
    cy.injectAxe()
    // Vi får SVGer fra @navikt/ds-icons som mangler "title", dette er ikke et problem siden ikonene ikke er viktige for innholdet
    cy.checkA11y(null, { rules: { 'svg-img-alt': { enabled: false } } }, logViolations)
}

function initialize() {
    // Authentication always fails on first api call, therefore we need to initialize
    cy.visit('/')
    cy.screenshot('initialize-done')

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
        cy.wait(60_000)
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
