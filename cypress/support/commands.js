// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('loginByAPI', () => {
    // cy.request('POST', 'http://localhost:8081/login', {
    //   username: Cypress.env('username'),
    //   password: Cypress.env('password')
    // }).then((response) => {
    //   expect(response.status).to.eq(200);
    //   // Vous pouvez définir les cookies ou le localStorage ici si nécessaire
    //   cy.log(response.body.token);
    //   //window.localStorage.setItem('authToken', response.body.token);
    //   //cy.setCookie('authToken', response.body.token);
    // });

    cy.visit(Cypress.env('baseUrl'));
        //clic sur Se connecter
        cy.get('[data-cy="nav-link-login"]').click();
        //entre le nom d'utiliseur et le mot de passe
        cy.get('[data-cy="login-input-username"]').type(Cypress.env('username'));
        cy.get('[data-cy="login-input-password"]').type(Cypress.env('password'));
        //clic sur Se connecter
        cy.get('[data-cy="login-submit"]').click();
  });