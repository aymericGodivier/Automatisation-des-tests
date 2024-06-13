describe('Smoke Test for Login Button', () => {
    const baseUrl = Cypress.env('baseUrl');
     
    it('should confirm the presence of the login button', () => {
        cy.visit(baseUrl);
        // Vérifie que le bouton "Se connecter" avec l'attribut data-cy="nav-link-login" est présent
        cy.get('[data-cy="nav-link-login"]').should('be.visible');
    }); 
    
});