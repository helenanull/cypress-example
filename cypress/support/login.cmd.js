Cypress.Commands.add('login', (email = Cypress.env('email'), password = Cypress.env('password')) => {
    const apiUrl = Cypress.env('apiUrl')

    cy.request({
        // here we can't use just '/users/login' because baseUrl is different than API url
        // if they are the same,
        // then we can just use url: '/users/login' without prefix, like in visit() command
        url: `${apiUrl}/users/login`,
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
