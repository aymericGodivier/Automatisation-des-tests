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
  cy.request('POST', `${Cypress.env('APIUrl')}/login`, {
    username: Cypress.env('username'),
    password: Cypress.env('password')
  }).then((response) => {
    expect(response.status).to.eq(200);
    // Vous pouvez définir les cookies ou le localStorage ici si nécessaire
    const authToken = response.body.token;
    Cypress.env('authToken', authToken); // Set authToken dans Cypress.env
  
     // Définir la clé de session dans le localStorage avec la clé 'user'
    cy.window().then((window) => {
      window.localStorage.setItem('user', authToken);
    });
  });
  });

  Cypress.Commands.add('resetCart', () => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('APIUrl')}/orders`,
        headers: {
          'Authorization': `Bearer ${Cypress.env('authToken')}`
        }
      }).then((response) => {
        expect(response.status).to.eq(200);
        const orderLines = response.body.orderLines;
        
        // Loop through each orderLine and delete it
        orderLines.forEach(orderLine => {
          cy.request({
            method: 'DELETE',
            url: `${Cypress.env('APIUrl')}/orders/${orderLine.id}/delete`,
            headers: {
              'Authorization': `Bearer ${Cypress.env('authToken')}`
            }
          }).then((deleteResponse) => {
            expect(deleteResponse.status).to.eq(200);
          });
        });
      });
  });

  Cypress.Commands.add('disconnectUser', () => {
    cy.visit(Cypress.env('baseUrl'));
    cy.get('body').then($body => {
      if ($body.find('[data-cy="nav-link-logout"]').length > 0) {
        // Si l'élément est trouvé, clique dessus
        cy.get('[data-cy="nav-link-logout"]').click();
      } else {
        // Sinon, log un message indiquant que l'utilisateur est déjà déconnecté
        cy.log('Utilisateur déjà déconnecté');
      }
    });      
      
  });

  Cypress.Commands.add('simulateLogin', () =>{

        cy.visit(Cypress.env('baseUrl'));
        //clic sur Se connecter
        cy.get('[data-cy="nav-link-login"]').click();
        //entre le nom d'utiliseur et le mot de passe
        cy.get('[data-cy="login-input-username"]').type(Cypress.env('username'));
        cy.get('[data-cy="login-input-password"]').type(Cypress.env('password'));
        //clic sur Se connecter
        cy.get('[data-cy="login-submit"]').click();
  });


  