describe('Add to cart Test', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 7;
    const valueToTest = 250; //mettre une valeur superieure à 20

    //login pour pouvoir ajouter au panier
    before(() => {
      cy.loginByAPI();
        cy.wait(1000); 
    });
  
    it('should stay on the same page and does nothing', () => {
        // visite la page produit
        cy.visit(`${baseUrl}/#/products`);
      
        // Sélectionnez le bouton avec l'ID spécifié et cliquez dessus
        cy.get(`[data-cy="product-link"][ng-reflect-router-link="/products,${productID}"]`).click();

        // Vérifiez que l'URL contient l'ID du produit
        cy.url().should('include', `/products/${productID}`);        
        cy.wait(1000);
        
        // Récupère l'URL actuelle avant l'ajout
        cy.url().then(currentUrl => {
            // Entrez une quantité négative
            cy.get('[data-cy="detail-product-quantity"]').clear().type(`${valueToTest}`);

            // Essayez d'ajouter au panier
            cy.get('[data-cy="detail-product-add"]').click();

            cy.wait(1000);
            // Vérifiez que l'URL n'a pas changé
            cy.url().should('eq', currentUrl);
        });
        
    });

    after(() => {
        cy.resetCart();
        cy.disconnectUser();
    });
});