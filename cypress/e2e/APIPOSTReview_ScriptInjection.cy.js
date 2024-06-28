describe('Add Review API Script Injection Test', () => {
    const APIUrl = Cypress.env('APIUrl');
    const baseUrl = Cypress.env('baseUrl');
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
            url: `${APIUrl}/reviews`,
            body: reviewDataWithScriptInTitle,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            // Vérifiez que la réponse ne contient pas de status 200 (OK) pour voir si l'injection de script est détecté au niveau du serveur mais ce n'ets pas le cas donc le test échoue
            expect(response.status).to.not.eq(200);

        });
    });

    it('should not allow script injection in the comment', () => {
        cy.request({
            method: 'POST',
            url: `${APIUrl}/reviews`,
            body: reviewDataWithScriptInComment,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            // Vérifiez que la réponse ne contient pas de status 200 (OK) pour voir si l'injection de script est détecté au niveau du serveur mais ce n'ets pas le cas donc le test échoue
            expect(response.status).to.not.eq(200);

        });
    });

    it('should detect script injection by console warning', () => {
        // Ajouter une review avec un script dans le commentaire
        cy.request({
            method: 'POST',
            url: `${APIUrl}/reviews`,
            body: reviewDataWithScriptInComment,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200);

            // Visiter la page qui affiche les reviews pour vérifier si le script est exécuté
            cy.visit(`${baseUrl}/#/reviews`); 

            // Intercepter les logs de la console
            cy.window().then((win) => {
                cy.stub(win.console, 'warn').as('consoleWarn');
            });

            // Attendre un peu pour que la page se charge et le warning soit potentiellement généré
            cy.wait(1000);

            // Vérifier que le warning de sanitation est apparu dans la console
            cy.get('@consoleWarn').should('be.calledWithMatch', /sanitizing HTML stripped some content/);
        });
    });

    after(() => {
        cy.disconnectUser(); 
    });
});
