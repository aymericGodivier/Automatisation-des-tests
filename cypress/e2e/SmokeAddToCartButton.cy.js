describe('Smoke Test for Post-Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 5;

    before(() => {
      cy.loginByAPI();
        cy.wait(1000); 
    });

    it('should confirm the presence of the Ajouter au panier button after login', () => {
        // Visitez la page d'un produit
        cy.visit(`${baseUrl}/#/products/${productID}`);  
        //Vérifie la présence du bouton ajouetr au panier
        cy.get('[data-cy="detail-product-add"]').should('be.visible');
      });

    after(() => {
      cy.disconnectUser();
    });
  });