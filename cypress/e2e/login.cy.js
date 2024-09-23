import login from '../selectors/login.css'
import header from '../selectors/header.css'

describe('Login', () => {
    // context is the same as describe
    context('unsuccessful', () => {
        it('can see error message when username/password incorrect', () => {
            // visit ('/login') -> will visit baseUrl + /login
            // baseUrl is set in config - cypress.json file
            cy.visit('/login')

            cy.get(login.emailField).type('random@test.com')
            cy.get(login.passwordField).type('random_pass')
            cy.get(login.signInButton).should('have.text', 'Login').click()
            cy.get(login.errorMessages).should('be.visible')
                .and('contain', 'Email not found sign in first')
        })
    })

    context('successful', () => {
        beforeEach(() => {
            // we need a new user
            cy.register().then((response) => {
                cy.wrap(response.email).as('email')
            })
            // log out - clear cookies and localstorage
            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visit('/login')
        })

        it('can log in', function () {
            const password = Cypress.env('password')

            cy.get(login.emailField).type(this.email)
            cy.get(login.passwordField).type(password)
            cy.get(login.signInButton).click()
            cy.get(header.navbarLinks).should('be.visible')
                .and('have.length', 4)
                .and('contain', 'cy')
        })
    })
})
