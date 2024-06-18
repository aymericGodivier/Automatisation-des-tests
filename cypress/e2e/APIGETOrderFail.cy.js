describe('Try to get the content of the cart whithout being connected', () => {
    const baseUrl = Cypress.env('APIUrl');
  
    it('should return an error 401', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/orders`,           
            failOnStatusCode: false
          }).then((response) => {
            expect(response.status).to.eq(401);
        });
    });  
    
  });