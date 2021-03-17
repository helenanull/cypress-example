import profile from '../selectors/profile.sel'

describe('Profile page', () => {
    beforeEach(() => {
        cy.register().then((email) => {
            // we need username to visit profile url
            cy.wrap(email.split('@')[0]).as('username')
            cy.login(email)
        })
    })

    it('contains correct elements', function () {
        cy.visit(`/@${this.username}`)
        cy.get(profile.editProfileButton).should('be.visible')
            .and('have.attr', 'href', '#/settings')
        cy.get(profile.userInfoArea).should('be.visible')
        cy.get(profile.myArticlesTab).should('be.visible')
            .and('have.css', 'color', 'rgb(92, 184, 92)')
        cy.get(profile.favouritedArticlesTab).should('be.visible')
    })
})
