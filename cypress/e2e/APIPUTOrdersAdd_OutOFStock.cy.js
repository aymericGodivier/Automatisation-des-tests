describe('Add to Cart API Test', () => {
    const baseUrl = Cypress.env('APIUrl');
    const productID = 3;//mettre l'ID d'un produit qui n'est pas en stock 
    const quantity = 2; 

 
    before(() => {
        // Connexion avant tous les tests
        cy.loginByAPI(); 
    });    

    it('add a product which is not in stock to the cart via the API', () => {
        cy.request({
            method: 'PUT',
            url: `${baseUrl}/orders/add`,
            body: {
                product: productID,
                quantity: quantity
            },
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);//on ne devrait pas avoir une réponse positive

            // Vérifiez que la réponse contient le produit avec la quantité correcte
            const order = response.body;
            const orderLine = order.orderLines.find(line => line.product.id === productID);
            expect(orderLine).to.exist;
            expect(orderLine.quantity).to.eq(quantity);
        });
    });

    // Déconnexion et vide la panier
    after(() => {
        cy.resetCart();
        cy.disconnectUser();
    });
});