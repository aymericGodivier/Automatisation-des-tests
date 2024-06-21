describe('Add Review API Test', () => {
    const baseUrl = Cypress.env('APIUrl');
    
    // Les données de la review
    const reviewData = {
        title: '!!TEST!! Excellent Produit',
        comment: '!!TEST!! Ces produits sont incroyables',
        rating: 5
    };

    // Hook exécuté une fois avant tous les tests de ce bloc
    before(() => {
        // Connexion avant tous les tests
        cy.loginByAPI(); 
    });

   

    it('should add a review via the API', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/reviews`,
            body: reviewData,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            // Vérifiez que la réponse contient les bonnes informations
            const review = response.body;
            expect(review).to.have.property('title', reviewData.title);
            expect(review).to.have.property('comment', reviewData.comment);
            expect(review).to.have.property('rating', reviewData.rating);
            expect(review).to.have.property('id').that.is.a('number');
        });
    });

     
    after(() => {
        cy.disconnectUser(); 
    });
});