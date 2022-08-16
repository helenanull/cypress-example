import settings from '../selectors/settings.sel'
import profile from '../selectors/profile.sel'

describe('Settings', () => {
    beforeEach(() => {
        cy.register()
        cy.visit('/settings')
    })

    it('can update settings', () => {
        const logoLink = 'https://media.giphy.com/media/jpbnoe3UIa8TU8LM13/giphy.gif'
        const username = `updated_cy${Math.random().toString().slice(2, 8)}`

        cy.get(settings.title).should('be.visible')
            .and('contain', 'Your Settings')
        cy.get(settings.imageField).clear().type(logoLink)
        cy.get(settings.usernameField).clear().type(username)
        cy.get(settings.bioField).type('update settings')
        cy.get(settings.submitButton).click()
        cy.url().should('eq', `${Cypress.config('baseUrl')}/@${username}`)
        cy.get(profile.savedBio).should('be.visible')
            .and('have.text', 'update settings')
        cy.get(profile.image)
            .should('have.css', 'height', '100px')
            .and('have.css', 'width', '100px')
            .and('be.visible')
            .and('have.attr', 'src', logoLink)
    })
})
