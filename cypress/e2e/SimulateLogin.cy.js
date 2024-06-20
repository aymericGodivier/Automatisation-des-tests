describe('simulating user login',()=> {
    const baseUrl = Cypress.env('baseUrl');
    const Username = Cypress.env('username');
    const Password = Cypress.env('password');

    it('should simulate the login and verify the presence of the Mon panier button', () => {
        cy.visit(baseUrl);
        //clic sur Se connecter
        cy.get('[data-cy="nav-link-login"]').click();
        //entre le nom d'utiliseur et le mot de passe
        cy.get('[data-cy="login-input-username"]').type(Username);
        cy.get('[data-cy="login-input-password"]').type(Password);
        //clic sur Se connecter
        cy.get('[data-cy="login-submit"]').click();
        //Vérifie qu'on a bien le bouton Mon panier qui apparait
        cy.get('[data-cy="nav-link-cart"]').should('be.visible');
    });
    
    after(() => {
        cy.disconnectUser();
    });
    
});