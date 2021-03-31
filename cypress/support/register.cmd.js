Cypress.Commands.add('register', () => {
    const apiUrl = Cypress.env('apiUrl')
    const username = `cy${Math.random().toString().slice(2, 11)}`
    const email = `${username}@mailinator.com`

    cy.request({
        url: `${apiUrl}/users`,
        method: 'POST',
        body: {
            user: {
                username: username,
                email: email,
                password: 'Testtest1'
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            cy.log('**user created**')
            cy.log(`**email: ${email}**`)
            cy.log('**password: Testtest1**')
        })
        // return email so that we can use that to log in
        .then(() => email)
})
