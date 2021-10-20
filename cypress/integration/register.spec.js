import registration from '../selectors/register.sel'
import header from '../selectors/header.sel'

describe('Register', () => {
    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases
    // using let is not neccessary and we use aliases in beforeEach instead
    // let username
    // let email

    beforeEach(() => {
        // we need random username and email each test
        const random = `cy${Math.random().toString().slice(2, 8)}`
        // use alias instead of let
        cy.wrap(random).as('username')
        cy.wrap(`${random}@mailinator.com`).as('email')
        cy.visit('/register')
    })

    // https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Avoiding-the-use-of-this
    // if we want to access alias in test, we need to change arrow function => to function ()
    it('can register a new account', function () {
        // added delay as sometimes it can make tests flaky if typing too fast (default is 10)
        cy.get(registration.usernameField).type(this.username, { delay: 50 })
        cy.get(registration.emailField).type(this.email)
        cy.get(registration.passwordField).type('Cypress12')
        cy.get(registration.signUpButton).click()
        cy.get(header.settingsLink).should('be.visible')
    })

    it('check registration request body and response', function () {
        const apiUrl = Cypress.env('newApiUrl')

        cy.intercept(`${apiUrl}/users`).as('loginRequest')
        cy.get(registration.usernameField).type(this.username)
        cy.get(registration.emailField).type(this.email)
        cy.get(registration.passwordField).type('Cypress12{enter}')

        cy.wait('@loginRequest').then((xhr) => {
            // check request body
            expect(xhr.request.body.user.email).to.eq(this.email)
            expect(xhr.request.body.user.password).to.eq('Cypress12')
            expect(xhr.request.body.user.username).to.eq(this.username)
            // check response body
            expect(xhr.response.body.user.email).to.eq(this.email)
            expect(xhr.response.body.user.token).not.to.eq(null)
        })
        cy.get(header.settingsLink).should('be.visible')
    })
})
