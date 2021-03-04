import registration from '../selectors/register.sel'
import header from '../selectors/header.sel'

describe('Register', () => {
    // actually we should not use let here, check register_aliases.spec
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases
    let username
    let email

    beforeEach(() => {
        // we need random username and email each test
        username = `cy${Math.random().toString().slice(2, 8)}`
        email = `${username}@mailinator.com`
        cy.visit('/register')
    })

    it('can register a new account', () => {
        // added delay as sometimes it can make tests flaky if typing too fast (default is 10)
        cy.get(registration.usernameField).type(username, { delay: 50 })
        cy.get(registration.emailField).type(email)
        cy.get(registration.passwordField).type('Testtest1')
        cy.get(registration.signUpButton).click()
        cy.get(header.settingsLink).should('be.visible')
    })

    it('check registration request body and response', () => {
        cy.intercept('/api/users').as('loginRequest')
        cy.get(registration.usernameField).type(username)
        cy.get(registration.emailField).type(email)
        cy.get(registration.passwordField).type('Testtest1{enter}')

        cy.wait('@loginRequest').then((xhr) => {
            // check request body
            expect(xhr.request.body.user.email).to.eq(email)
            expect(xhr.request.body.user.password).to.eq('Testtest1')
            expect(xhr.request.body.user.username).to.eq(username)
            // check response body
            expect(xhr.response.body.user.email).to.eq(email)
            expect(xhr.response.body.user.id).not.to.eq(null)
            expect(xhr.response.body.user.token).not.to.eq(null)
        })
        cy.get(header.settingsLink).should('be.visible')
    })
})
