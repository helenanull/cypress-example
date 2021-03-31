import login from '../selectors/login.sel'
import header from '../selectors/header.sel'

describe('Login', () => {
    // context is the same as describe
    context('unsuccessful', () => {
        beforeEach(() => {
            // visit ('/login') -> will visit baseUrl + /login
            // baseUrl is set in config - cypress.json file
            cy.visit('/login')
        })

        it('can see error message when username/password incorrect', () => {
            cy.get(login.emailField).type('random@test.com')
            cy.get(login.passwordField).type('random_pass')
            cy.get(login.signInButton).should('have.text', 'Sign in').click()
            cy.get(login.errorMessages).should('be.visible')
                .and('contain', 'email or password is invalid')
        })

        it('can see error message when username and password fields are empty', () => {
            cy.get(login.signInButton).click()
            cy.get(login.errorMessages).should('be.visible')
                .and('contain', 'email or password is invalid')
        })

        it('can see error message when API responds with 500', () => {
            const apiUrl = Cypress.env('apiUrl')

            cy.intercept(`${apiUrl}/users/login`, {
                method: 'POST',
                statusCode: 500,
                fixture: 'login_error'
            })
            cy.get(login.emailField).type('random2@test.com')
            cy.get(login.passwordField).type('random_pass{enter}')
            cy.get(login.errorMessages).should('be.visible')
                .and('contain', 'Error 500 - Internal server error')
        })
    })

    context('successful', () => {
        beforeEach(() => {
            // we need a new user
            cy.register().then((email) => {
                cy.wrap(email).as('email')
            })
            cy.visit('/login')
        })

        it('can log in', function () {
            cy.get(login.emailField).type(this.email)
            cy.get(login.passwordField).type('Testtest1')
            cy.get(login.signInButton).click()
            cy.get(header.settingsLink).should('be.visible')
        })
    })
})
