describe('Smoke Test for Post-Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
    const APIUrl = Cypress.env('APIUrl');
    const Username = Cypress.env('username');
    const Password = Cypress.env('password');
    it('should confirm the presence of the Ajouter au panier button after login', () => {
      // Effectue la requête POST pour se connecter
      cy.request('POST', `${APIUrl}/login`, {
        username: Username,
        password: Password
      }).then((response) => {
        // Assurez-vous que la connexion est réussie
        expect(response.status).to.eq(200);
  
        // Visitez la page qui nécessite une connexion
        cy.visit(baseUrl);  
        //il faut que ej finisse cette partie mais je ne sais pas ce que je dosi chercher
      });
    });
  });