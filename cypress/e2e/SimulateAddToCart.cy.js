describe('Add to cart Test', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 7;
    let initialStock;

    //login pour pouvoir ajouter au panier
    before(() => {
      cy.loginByAPI();
        cy.wait(1000); 
    });
  
    it('should add one product to the cart', () => {
        // visite la page produit
        cy.visit(`${baseUrl}/#/products`);
      
        // Sélectionnez le bouton avec l'ID spécifié et cliquez dessus
        cy.get(`[data-cy="product-link"][ng-reflect-router-link="/products,${productID}"]`).click();

        // Vérifiez que l'URL contient l'ID du produit
        cy.url().should('include', `/products/${productID}`);
        
        cy.wait(1000);
        //récupère la valeur actuelle du stock 
        
        cy.get('[data-cy="detail-product-stock"]')
            .invoke('text')
            .then((text) => {
                cy.log(`Texte complet récupéré : ${text}`); // Affiche le texte complet récupéré dans les logs
                const match = text.match(/(-?\d+)\s*en stock/); // Extrait le nombre de produits en stock avec le signe moins
                if (match) {
                    const stock = Number(match[1]); // Convertit en nombre
                    if (stock > 1) { // Vérifie si le stock est strictement supérieur à 1
                        initialStock = stock;
                        expect(initialStock).to.be.a('number');
                    } else {
                        throw new Error('Le stock est insuffisant (doit être strictement supérieur à 1)');
                    }
                } else {
                    throw new Error('Le nombre de produits en stock n\'a pas été trouvé');
                }
            });

        //ajoute l'élément au panier

        cy.get('[data-cy="detail-product-add"]').click();
        //vérifie qu'on a au moins un objet dans le panier
        cy.get('[data-cy="cart-line-quantity"]').invoke('val').then((value) => {
            const quantity = parseInt(value, 10);
            expect(quantity).to.be.at.least(1);
          });
        cy.wait(1000);
        //retourne sur la page du produit  
        cy.visit(`${baseUrl}/#/products/${productID}`);
        cy.wait(1000);
        //vérifie que le stock a diminué de 1  
        cy.get('[data-cy="detail-product-stock"]')//.should('contain.text', 'en stock') // Vérifie que le texte "en stock" est présent
        .then(($element) => {
            try {
                const text = $element.text(); // Récupère le texte de l'élément
                cy.log(`Texte complet récupéré : ${text}`); // Affiche le texte complet récupéré dans les logs
                const match = text.match(/(\d+)\s*en stock/); // Extrait le nombre de produits en stock
                if (match) {
                const newStock = parseInt(match[1], 10);
                expect(newStock).to.equal(initialStock - 1);
            } else {
                throw new Error('Le nombre de produits en stock n\'a pas été trouvé');
            }
        } catch (error) {
            cy.log(error.message); // Log l'erreur dans Cypress
            throw error; // Relance l'erreur pour que le test échoue correctement
        }
        });
    });
    after(() => {
        cy.resetCart();
        cy.disconnectUser();
    });
});