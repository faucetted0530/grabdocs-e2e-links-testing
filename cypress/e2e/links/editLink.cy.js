describe('Edit Upload Link', () => {
  const updatedLinkName = 'Edited Testing Link';

  beforeEach(() => {
    Cypress.on('uncaught:exception', (err) => {
      const msg = err?.message || '';
      if (
        msg.includes('ChunkLoadError') ||
        msg.includes('Loading chunk') ||
        msg.includes('failed')
      ) {
        return false;
      }
    });

    cy.visit('https://app.grabdocs.com/quick-links');
    cy.wait(800);

    cy.login();
    cy.wait(800);

    cy.get('button[title="Quick Apps"]').click();
    cy.wait(600);

    cy.contains(/Quick Links/i).click();
    cy.wait(600);

    cy.contains('button', /New Link/i).click();
    cy.wait(600);

    cy.contains('button', /Create Link/i).click();
    cy.wait(800);
  });

  it('edits an existing upload link', () => {
    cy.intercept('PUT', '**/api/v1/web/upload-links/*').as('editUploadLink');

    cy.contains('td', 'Unnamed Link')
      .parent('tr')
      .within(() => {
        cy.get('button[aria-label="Options"]').click();
      });

    cy.wait(600);

    cy.contains('div, li, span, a, button', /^Edit$/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(800);

    cy.contains(/Edit Upload Link|Edit Link/i).should('be.visible');
    cy.wait(600);

    cy.get('input[type="text"], input[name*="name" i]')
      .first()
      .clear()
      .type(updatedLinkName);

    cy.wait(600);

    cy.contains('button', /Save|Update|Apply/i)
      .should('be.enabled')
      .click();

    cy.wait('@editUploadLink')
      .its('response.statusCode')
      .should('eq', 200);

    cy.wait(800);

    cy.contains('td', updatedLinkName, { timeout: 10000 })
      .should('be.visible');
  });
});
