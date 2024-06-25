describe('Review API testing the char limit on the title and the comment', () => {
    const baseUrl = Cypress.env('APIUrl');
    
    // Les données de la review
    const reviewDataTitle = {
        //le titre doit faire plus de 255 char de long
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus a eros volutpat tempor. In quis arcu et eros porta lobortis sit amet at turpis. Mauris ornare quam a velit sollicitudin, at faucibus neque ullamcorper. Curabitur condimentum non nisi ac fringilla. Suspendisse potenti. Nullam id dolor ultricies, pellentesque orci vel, venenatis justo. Fusce pharetra quam et fringilla tincidunt. Vestibulum varius mauris non tortor sodales, id interdum leo tristique. In vulputate erat sed nibh fermentum, vel consequat nulla fermentum. Morbi vitae scelerisque metus. Integer non erat lorem. Quisque venenatis a quam nec fringilla. Integer id nulla non dui sagittis',
        comment: '!!TEST!! test title',
        rating: 5
    };

    const reviewDataComment = {
        title: '!!TEST!! test comment ',
        //le comment doit faire plus de 500 char de long
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis. Proin viverra risus a eros volutpat tempor. In quis arcu et eros porta lobortis sit amet at turpis. Mauris ornare quam a velit sollicitudin, at faucibus neque ullamcorper. Curabitur condimentum non nisi ac fringilla. Suspendisse potenti. Nullam id dolor ultricies, pellentesque orci vel, venenatis justo. Fusce pharetra quam et fringilla tincidunt. Vestibulum varius mauris non tortor sodales, id interdum leo tristique. In vulputate erat sed nibh fermentum, vel consequat nulla fermentum. Morbi vitae scelerisque metus. Integer non erat lorem. Quisque venenatis a quam nec fringilla. Integer id nulla non dui sagittis.Aenean a nisi sit amet magna convallis pulvinar. Mauris non odio eros. Donec et metus est. Cras et ligula nec sapien feugiat sodales nec in ligula. Fusce feugiat nec sem ac lacinia. Nam in odio in ipsum vulputate sollicitudin. Sed laoreet consectetur scelerisque. Integer in diam vitae lacus luctus varius ut quis eros. Nam tempor felis ut tortor consectetur, eget dapibus dui tincidunt. Suspendisse potenti. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque gravida augue vitae ligula ultricies ultrices. Nulla facilisi. Nam interdum erat sed libero faucibus, a pulvinar lectus viverra. Aliquam erat volutpat. Nullam ac arcu ac magna porttitor convallis vel vel urna. Cras nec felis ut odio malesuada aliquet. Vestibulum aliquam erat vel erat aliquet, et accumsan justo luctus.',
        rating: 5
    };

    // Hook exécuté une fois avant tous les tests de ce bloc
    before(() => {
        // Connexion avant tous les tests
        cy.loginByAPI(); 
    });

   

    it('should generate an error 500 because the title is too long', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/reviews`,
            body: reviewDataTitle,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(500);
        });
    });

    it('should generate an error 500 because the comment is too long', () => {
        cy.request({
            method: 'POST',
            url: `${baseUrl}/reviews`,
            body: reviewDataComment,
            headers: {
                Authorization: `Bearer ${Cypress.env('authToken')}`
            },
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(500);
        });
    });

     
    after(() => {
        cy.disconnectUser(); 
    });
});