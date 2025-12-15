describe('UI Verification', () => {
  beforeEach(() => {
    cy.visit('https://app.grabdocs.com/quick-links');
    cy.wait(800);

    cy.login();
    cy.wait(800);

    cy.get('button[title="Quick Apps"]').click();
    cy.wait(600);

    cy.contains(/Quick Links/i).click();
    cy.wait(600);
  });

  it('display content and buttons', () => {
    cy.url().should('match', /quick-links/i);
    cy.wait(400);

    cy.contains(/Quick Links/i).should('be.visible');
    cy.wait(400);

    cy.contains('button', /New Link/).should('be.visible');
  });
});

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
  });

  it('create link', () => {
    cy.intercept('POST', '**/api/v1/web/upload-links').as('createLink');

    cy.contains('button', /New Link/i).click();
    cy.wait(700);

    cy.contains(/Create Upload Link/i).should('be.visible');
    cy.wait(600);

    cy.get('input[placeholder="Enter link name"]').type('Testing Link');
    cy.wait(400);

    cy.contains('button', /Create Link/i).click();

    cy.wait('@createLink').then(({ request, response }) => {
      expect(request.url).to.include('api/v1/web/upload-links');
      expect(request.method).to.eq('POST');
      expect(request.body).to.include({ link_name: 'Testing Link' });

      expect(response.statusCode).to.eq(200);
      expect(response.body).to.include({
        message: 'Upload link created successfully',
        success: true
      });
    });

    cy.wait(800);

    cy.contains(/Upload link created successfully/i).should('be.visible');
  });
});
