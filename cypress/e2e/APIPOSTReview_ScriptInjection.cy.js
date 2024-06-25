describe('Add Review API Script Injection Test', () => {
    const baseUrl = Cypress.env('APIUrl');
    
    // Les données de la review avec script injection dans le title
    const reviewDataWithScriptInTitle = {
        title: '<script>alert("XSS")</script>',
        comment: '!!TEST!! Ces produits sont incroyables',
        rating: 5
    };

    // Les données de la review avec script injection dans le comment
    const reviewDataWithScriptInComment = {
        title: '!!TEST!! Excellent Produit',
        comment: '<script>alert("XSS")</script>',
        rating: 5
    };

    // Hook exécuté une fois avant tous les tests de ce bloc
    before(() => {
        // Connexion avant tous les tests
        cy.loginByAPI(); 
    });

    it('should not allow script injection in the title', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/reviews`,
            body: reviewDataWithScriptInTitle,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            // Vérifiez que la réponse ne contient pas de status 200 (OK)
            expect(response.status).to.not.eq(200);

        });
    });

    it('should not allow script injection in the comment', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/reviews`,
            body: reviewDataWithScriptInComment,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            // Vérifiez que la réponse ne contient pas de status 200 (OK)
            expect(response.status).to.not.eq(200);

        });
    });

    after(() => {
        cy.disconnectUser(); 
    });
});
