describe('Success Scenarios', () => {
  const recipientEmail = 'donovan.tyree.faucette@gmail.com';

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

    cy.get('body').then(($body) => {
      if ($body.find('.Toastify__toast-container').length) {
        cy.get('.Toastify__toast-container', { timeout: 10000 }).should('not.exist');
      }
    });

    cy.wait(400);
  });

  it('shares upload link by sending email', () => {
    Cypress.on('uncaught:exception', (err) => {
      if (err.message.includes('writeText') && err.message.includes('Clipboard')) {
        return false;
      }
    });

    cy.intercept('POST', '**/api/v1/web/upload-links/**').as('shareLink');

    cy.contains('td', 'Unnamed Link')
      .parent('tr')
      .within(() => {
        cy.get('button[aria-label="Options"]').click({ force: true });
      });

    cy.wait(600);

    cy.contains('div, li, span, a, button', /^Share$/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(700);

    cy.contains(/Share Upload Link/i).should('be.visible');
    cy.wait(600);

    cy.get('textarea[placeholder*="recipient1@example.com" i]')
      .should('be.visible')
      .clear()
      .type(recipientEmail);

    cy.wait(600);

    cy.contains('button', /^Send Email$/i)
      .should('be.enabled')
      .click({ force: true });

    cy.wait('@shareLink')
      .its('response.statusCode')
      .should('eq', 200);
  });
});
