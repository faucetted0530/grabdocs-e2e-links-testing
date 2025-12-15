describe('Disable Upload Link', () => {
  beforeEach(() => {
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

  it('disables an active upload link', () => {
    cy.intercept('PUT', '**/api/v1/web/upload-links/*').as('disableUploadLink');

    cy.contains('td', 'Unnamed Link')
      .parent('tr')
      .within(() => {
        cy.get('button[aria-label="Options"]').click();
      });

    cy.wait(600);

    cy.contains('div, li, span, a, button', /^Disable$/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(800);

    cy.wait('@disableUploadLink')
      .its('response.statusCode')
      .should('eq', 200);

    cy.wait(800);

    cy.contains(/disabled|inactive|upload link disabled|upload link updated|successfully/i, { timeout: 10000 })
      .should('be.visible');
  });
});
