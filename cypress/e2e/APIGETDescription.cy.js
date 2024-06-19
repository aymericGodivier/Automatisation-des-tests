describe('Getting the descritpion of a product', () => {
    const baseUrl = Cypress.env('APIUrl');    
    const expectedAromas = "Nature et végétal";
    const expectedDescription = "Savon surgras à l'huile d'olive, particulièrement utile contre la peau sèche.";
    const itemID = 4;
    const expectedIngredients = "Huile d'olive, glycérine végétale";
    const expectedName = "Chuchotements d'été";
    const expectedPicture =  "https://cdn.pixabay.com/photo/2017/09/07/19/43/soap-2726387_960_720.jpg";
    const expectedPrice = 37;
    const expectedSkin = "Sèche";
    const expectedVarieties = 6;
  
    it('should return the description of the specified item', () => {
        cy.request({
            method: 'GET',
            url: `${baseUrl}/products/${itemID}`,
            
            failOnStatusCode: false // empêche Cypress de rater le test sur des codes status non-2xx 
          }).then((response) => {
            // Vérifie que le statut de la réponse est 200
            expect(response.status).to.eq(200);
            // Vérifie les valeurs spécifiques des champs
            expect(response.body.aromas).to.eq(expectedAromas);          
            expect(response.body.description).to.eq(expectedDescription);
            expect(response.body.id).to.eq(itemID);
            expect(response.body.ingredients).to.eq(expectedIngredients);
            expect(response.body.name).to.eq(expectedName);
            expect(response.body.picture).to.eq(expectedPicture);
            expect(response.body.price).to.eq(expectedPrice);
            expect(response.body.skin).to.eq(expectedSkin);
            expect(response.body.varieties).to.eq(expectedVarieties);
            
          });
    });
  
    
  });