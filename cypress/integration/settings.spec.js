import settings from '../selectors/settings.sel'
import profile from '../selectors/profile.sel'

describe('Settings', () => {
    beforeEach(() => {
        cy.register().then((email) => {
            cy.login(email)
        })
        cy.visit('/settings')
    })

    it('can update settings', () => {
        const logoLink = 'https://www.cypress.io/static/33498b5f95008093f5f94467c61d20ab/ac1e1/cypress-logo.webp'
        const username = `updated_cy${Math.random().toString().slice(2, 8)}`

        cy.get(settings.title).should('be.visible')
            .and('contain', 'Your Settings')
        cy.get(settings.imageField).type(logoLink)
        cy.get(settings.usernameField).clear().type(username)
        cy.get(settings.bioField).type('update settings')
        cy.get(settings.submitButton).click()
        cy.url().should('eq', `${Cypress.config('baseUrl')}/@${username}`)
        cy.get(profile.savedBio).should('be.visible')
            .and('have.text', 'update settings')
        cy.get(profile.image).should('be.visible')
            .and('have.attr', 'src', logoLink)
    })

    it('can see error message when fields are empty', () => {
        cy.get(settings.usernameField).clear()
        cy.get(settings.emailField).clear()
        cy.get(settings.submitButton).click()
        cy.url().should('include', '/settings')
        cy.get(settings.errorMessages).should('be.visible')
            .and('contain', 'email can\'t be blank')
            .and('contain', 'username can\'t be blank')
            .and('contain', 'username is too short')
    })
})
