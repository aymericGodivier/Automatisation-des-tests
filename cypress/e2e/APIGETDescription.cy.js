describe('Getting the descritpion of a product', () => {
    const baseUrl = Cypress.env('APIUrl');
    const itemID = 4;
    const expectedDescription = "Savon surgras à l'huile d'olive, particulièrement utile contre la peau sèche.";
    const expectedName = "Chuchotements d'été";
  
    it('should return the description of the specified item', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/products/${itemID}`,
            
            failOnStatusCode: false // prevents Cypress from failing the test on non-2xx status codes
          }).then((response) => {
            // Vérifie que le statut de la réponse est 200
            expect(response.status).to.eq(200);
            cy.log(response.body);
            // Vérifie les valeurs spécifiques des champs
            expect(response.body.id).to.eq(itemID);
            expect(response.body.name).to.eq(expectedName);
            expect(response.body.description).to.eq(expectedDescription);
          });
    });
  
    
  });