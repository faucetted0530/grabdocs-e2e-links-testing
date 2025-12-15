describe('Success Scenarios', () => {
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

  it('delete link', () => {
    cy.intercept('DELETE', '**/api/v1/web/upload-links/**').as('deleteLink');

    cy.contains('td', 'Unnamed Link')
      .parent('tr')
      .find('button[aria-label="Options"]')
      .click();

    cy.wait(600);

    cy.contains('div, li, span, a, button', /^Delete$/i, { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    cy.wait(600);

    cy.wait('@deleteLink').then(({ request, response }) => {
      expect(request.url).to.include('api/v1/web/upload-links/');
      expect(request.method).to.eq('DELETE');

      expect(response.statusCode).to.eq(200);
      expect(response.body).to.include({
        message: 'Upload link deleted successfully',
        success: true
      });
    });

    cy.wait(800);

    cy.contains(/Upload link deleted successfully/i).should('be.visible');
  });
});
