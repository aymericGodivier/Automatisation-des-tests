describe('Smoke Test for the presence of Add to cart button before and after login', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 5;

    it('tries to find the button Ajouter au panier whithout login', () => {
      // Visitez la page d'un produit
      cy.visit(`${baseUrl}/#/products/${productID}`);  
      //Vérifie la présence du bouton ajouetr au panier
      cy.get('[data-cy="detail-product-add"]').should.not('be.visible');//on ne devrait pas trouver le bouton si l'on n'est pas connecté
    });

    it('should confirm the presence of the Ajouter au panier button after login', () => {
        cy.loginByAPI();
        // Visitez la page d'un produit
        cy.visit(`${baseUrl}/#/products/${productID}`);  
        //Vérifie la présence du bouton ajouetr au panier
        cy.get('[data-cy="detail-product-add"]').should('be.visible');
      });

    after(() => {
      cy.disconnectUser();
    });
  });