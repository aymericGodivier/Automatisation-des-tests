describe('Login API Tests', () => {
    const baseUrl = Cypress.env('APIUrl');
    const knownUsername = Cypress.env('username');
    const knownPassword = Cypress.env('password');
    const unknownUsername = Cypress.env('unknownUsername');
    const unknownPassword = Cypress.env('unknownPassword');
  
    it('should return 401 for unknown user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          username: unknownUsername,
          password: unknownPassword
        },
        failOnStatusCode: false // prevents Cypress from failing the test on non-2xx status codes
      }).then((response) => {
        expect(response.status).to.eq(401);
      });
    });
  
    it('should return 200 for known user', () => {
      cy.request({
        method: 'POST',
        url: `${baseUrl}/login`,
        body: {
          username: knownUsername,
          password: knownPassword
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });