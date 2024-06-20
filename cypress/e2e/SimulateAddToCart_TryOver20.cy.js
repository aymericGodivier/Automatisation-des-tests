describe('Add to cart Test', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 7;

    //login pour pouvoir ajouter au panier
    before(() => {
      cy.loginByAPI();
        cy.wait(1000); 
    });
  
    it('should go on the cart page', () => {
        // visite la page produit
        cy.visit(`${baseUrl}/#/products`);
      
        // Sélectionnez le bouton avec l'ID spécifié et cliquez dessus
        cy.get(`[data-cy="product-link"][ng-reflect-router-link="/products,${productID}"]`).click();
    
        // Vérifiez que l'URL contient l'ID du produit
        cy.url().should('include', `/products/${productID}`);        
        cy.wait(1000);
        
        // Récupère l'URL actuelle avant l'ajout
        cy.url().then(currentUrl => {
            // Entrez un nombre suprérieur à 20
            cy.get('[data-cy="detail-product-quantity"]').clear().type('250');
    
            // Essayez d'ajouter au panier
            cy.get('[data-cy="detail-product-add"]').click();
    
            // Vérifiez que l'on est sur la panier
            cy.get('[data-cy="cart-line-quantity"]').invoke('val').then((value) => {
                const quantity = parseInt(value, 10);
                expect(quantity).to.be.at.least(1);
            });
        });
        
    });  

    after(() => {
        cy.resetCart();
        cy.disconnectUser();
    });
});