describe('Home page', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('should display users', () => {
    cy
      .get('.column').should('have.length', 4);
  });

  it('should display a user\'s favorite Pokemon', () => {
    cy
      .get('[data-test=pokemon]').first().should('not.be.empty');
  });

  it('should navigate to a profile view when clicked', () => {
    cy
      .get('[data-test=name]').first().click()
      .url().should('contain', '/user/');
  });
});