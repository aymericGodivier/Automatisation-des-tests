describe('Add to cart Test', () => {
    const baseUrl = Cypress.env('baseUrl');
    const APIURl = Cypress.env('APIUrl');
    const productID = 3;

    //login pour pouvoir ajouter au panier
    before(() => {
      cy.loginByAPI();

        cy.wait(1000); 
    });
  
    it('should get the list of products in the cart', () => {
        //ajouter un produit au panier pour s'assurer qu'il n'est pas vide
        cy.visit(`${baseUrl}/#/products/${productID}`);
        cy.wait(1000);
        cy.get('[data-cy="detail-product-add"]').click();

        cy.request({
            method: 'GET',
            url: `${APIURl}/orders`,
            headers: {
              'Authorization': `Bearer ${Cypress.env('authToken')}` // Utilise le token de Cypress.env
            },
            failOnStatusCode: false // Pour ne pas générer directement uen erreur
          }).then((response) => {
            if (response.status === 200) {
              cy.log(response);
               // Vérifiez que orderLines est un tableau avec une longueur d'au moins 1
                const orderLines = response.body.orderLines;
                expect(orderLines).to.be.an('array').that.is.not.empty;

                // Vérifiez qu'il y a au moins un objet dans orderLines avec l'ID de produit spécifié
                const itemFound = orderLines.some(orderLine => orderLine.product.id === productID);
                expect(itemFound).to.be.true;
              
            } else if (response.status === 404) {
              // Pas de commande trouvée
              //expect(response.body).to.be.empty;
              cy.log("erreur 404");
            } else {
              throw new Error(`Unexpected status code: ${response.status}`);
            }
        });
    });
  });
  //vide le panier et déconnecte
  after(() => {
    cy.resetCart();
    cy.disconnectUser();
  });