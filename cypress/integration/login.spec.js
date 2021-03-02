import loginPage from '../selectors/login.sel'

describe('Login', () => {
    beforeEach(() => {
        // visit ('/login') -> will visit baseUrl + /login
        // baseUrl is set in config - cypress.json file
        visit('/login')
    })

    it('can see error message when username/password incorrect', () => {
        cy.get(loginPage.emailField).type('random@test.com')
        cy.get(loginPage.passwordField).type('random_pass')
        cy.get(loginPage.signInButton).should('have.text', 'Sign in').click()
        cy.get(loginPage.errorMessages).should('be.visible')
            .and('have.text', 'email or password is invalid')
    })

    it('can press enter to log in', () => {
        cy.get(loginPage.emailField).type('random2@test.com')
        cy.get(loginPage.passwordField).type('random_pass{enter}')
        cy.get(loginPage.errorMessages).should('be.visible')
            .and('have.text', 'email or password is invalid')
    })
})