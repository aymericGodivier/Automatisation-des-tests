describe('Smoke Test for Post-Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
    const APIUrl = Cypress.env('APIUrl');
    const productID = 5;
    const Username = Cypress.env('username');
    const Password = Cypress.env('password');
    it('should confirm the presence of the Ajouter au panier button after login', () => {
      // Effectue la requête POST pour se connecter
      cy.request('POST', `${APIUrl}/login`, {
        username: Username,
        password: Password
      }).then((response) => {
        // Vérifier que la connexion est réussie
        expect(response.status).to.eq(200);  
        // Visitez la page d'un produit
        cy.visit(`${baseUrl}/#/products/${productID}`);  
        //Vérifie la présence du bouton ajouetr au panier
        cy.get('[data-cy="detail-product-add"]').should('be.visible');
      });
    });
  });