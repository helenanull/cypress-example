Cypress.Commands.add('login', (email = Cypress.env('email'), password = Cypress.env('password')) => {
    cy.request({
        // here we can't use just '/api/users/login' because baseUrl is different than API url
        // if they are the same, then we can just use url: '/api/users/login' like in visit()
        url: 'https://conduit.productionready.io/api/users/login',
        method: 'POST',
        body: {
            user: {
                email: email,
                password: password
            }
        }
    }).then((response) => {
        expect(response.status).to.eq(200)
        window.localStorage.setItem('jwtToken', response.body.user.token)
    })
})
