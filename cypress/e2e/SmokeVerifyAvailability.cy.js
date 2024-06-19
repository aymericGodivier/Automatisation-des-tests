describe('Smoke Test for Post-Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 3;

    it('should confirm the presence of the stock availability', () => {
        
        // Visitez la page d'un produit
        cy.visit(`${baseUrl}/#/products/${productID}`);
        cy.wait(1000);  
        //Vérifie la présence du champ de disponibilité
        cy.get('[data-cy="detail-product-stock"]').should('be.visible')
        .invoke('text')
        .should((text) => {
          expect(text).to.match(/\d+/); // Vérifie que le texte contient un nombre
        });
      });
    });
