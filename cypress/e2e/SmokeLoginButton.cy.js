describe('Smoke Test for Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
     
    it('should confirm the presence username input, password input and the login button ', () => {
        cy.visit(`${baseUrl}/#/login`);
        //Vérifie la présence du champ mail
        cy.get('[data-cy="login-input-username"]').should('be.visible');
        //Vérifie la présence du champ mot de passe
        cy.get('[data-cy="login-input-password"]').should('be.visible');
        // Vérifie la présence du bouton "Se connecter" 
        cy.get('[data-cy="login-submit"]').should('be.visible');
    }); 
    
});