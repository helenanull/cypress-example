import login from '../selectors/login.sel'

describe('Login', () => {
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

    it('can press enter to log in', () => {
        cy.get(login.emailField).type('random2@test.com')
        cy.get(login.passwordField).type('random_pass{enter}')
        cy.get(login.errorMessages).should('be.visible')
            .and('contain', 'email or password is invalid')
    })
})
