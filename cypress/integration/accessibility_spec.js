/* eslint-disable no-undef */
/* eslint-disable indent */
const table = require('table').table;

const tableConfig = {
    columns: {
        0: {
            width: 90
        }
    }
};

function toViolationTableStr(violations) {
    const violationData = violations.map(violation => {
            const { id, impact, description, nodes, help, helpUrl  } = violation;

            const targetsStr = `${nodes.map(n => `\n    Location: ${n.target}\n    Source: ${n.html}`).join('\n    ==========\n')}`;

            let descriptionStr = '';
            descriptionStr += `Id: ${id}\n\n`;
            descriptionStr += `Impact: ${impact}\n\n`;
            descriptionStr += `Description: ${description}\n\n`;
            descriptionStr += `Targets: ${targetsStr}\n\n`;
            descriptionStr += `Help: ${help}\n`;
            descriptionStr += `${helpUrl}`;

            return [descriptionStr];
        }
    )

    const violationsWithHeader = [
        ['ACCESSIBILITY VIOLATIONS'],
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
    cy.checkA11y(null, {rules: {'svg-img-alt': {enabled: false}} }, logViolations)
}

function gaTilForside() {
    cy.visit('/')
    try {
			cy.get('[data-testid=forside-page]', {timeout: 60_000})
		} catch (e) {
			cy.visit('/')
			cy.get('[data-testid=forside-page]', {timeout: 60_000})
		}

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
