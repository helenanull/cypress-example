Cypress.Commands.add('register', () => {
    const apiUrl = Cypress.env('apiUrl')
    const username = `cy${Math.random().toString().slice(2, 11)}`
    const email = `${username}@mailinator.com`
    const password = Cypress.env('password')

    cy.request({
        // here we can't use just '/users' url because baseUrl is different than API url
        // if they are the same,
        // then we can just use: '/users' without prefix, like in visit() command
        url: `${apiUrl}/users`,
        method: 'POST',
        body: {
            user: {
                username: username,
                email: email,
                password: password
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(201)
            // user is also logged in after registering
            // so we can just save token
            // user is also logged in after registering
            // so we can just save token
            const bio = response.body.user.bio
            const image = response.body.user.image
            const token = response.body.user.token
            const tokenData = {
                headers: {
                    Authorization: `Token ${token}`
                },
                isAuth: true,
                loggedUser: {
                    email: email,
                    username: username,
                    bio: bio,
                    image: image,
                    token: token
                }
            }
            window.localStorage.setItem('loggedUser', JSON.stringify(tokenData))

            cy.log('**user created**')
            cy.log(`**email: ${email}**`)
            cy.log(`**password: ${password}**`)
        })
        .then(() => ({
            // we need email and username in tests
            email: email,
            username: username
        }))
})
