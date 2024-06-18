describe('Add to cart Test', () => {
    const baseUrl = Cypress.env('baseUrl');
    const productID = 7;
    let initialStock;

    const Username = Cypress.env('username');
    const Password = Cypress.env('password');

    //login pour pouvoir ajouter au panier
    before(() => {
      cy.loginByAPI();
        // cy.visit(baseUrl);
        // //clic sur Se connecter
        // cy.get('[data-cy="nav-link-login"]').click();
        // //entre le nom d'utiliseur et le mot de passe
        // cy.get('[data-cy="login-input-username"]').type(Username);
        // cy.get('[data-cy="login-input-password"]').type(Password);
        // //clic sur Se connecter
        // cy.get('[data-cy="login-submit"]').click();
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
        cy.get('[data-cy="detail-product-stock"]')//.should('contain.text', 'en stock') // Vérifie que le texte "en stock" est présent
        .then(($element) => {
          try {
            const text = $element.text(); // Récupère le texte de l'élément
            cy.log(`Texte complet récupéré : ${text}`); // Affiche le texte complet récupéré dans les logs
            const match = text.match(/(\d+)\s*en stock/); // Extrait le nombre de produits en stock
            if (match) {
                initialStock = parseInt(match[1], 10);
                expect(initialStock).to.be.a('number');
            } else {
                throw new Error('Le nombre de produits en stock n\'a pas été trouvé');
            }
        } catch (error) {
            cy.log(error.message); // Log l'erreur dans Cypress
            throw error; // Relance l'erreur pour que le test échoue correctement
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
  });