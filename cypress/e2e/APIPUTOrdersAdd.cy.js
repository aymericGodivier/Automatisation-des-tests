describe('Add to Cart API Test', () => {
    const baseUrl = Cypress.env('APIUrl');
    const productID = 3; 
    const quantity = 2; 

 
    before(() => {
        // Connexion avant tous les tests
        cy.loginByAPI(); 
    });    

    it('should add a product to the cart via the API', () => {
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
            expect(response.status).to.eq(200);

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