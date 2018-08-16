describe('Home page', () => {
  before(() => {
    Cypress.config('baseUrl', 'http://localhost:4200');
  });

  beforeEach(() => {
    cy
      .visit('/')
      .get('[data-test=name]').first().click()
      .url().should('contain', '/user/');
  });

  it('should contain an image', () => {
    cy
      .get('.avatar').should('be.visible');
  });
});