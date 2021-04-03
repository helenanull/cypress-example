import header from '../selectors/header.sel'

describe('Header', () => {
    it('contains correct elements when logged out', () => {
        // when visit is empty, it will visit baseUrl
        cy.visit('')
        cy.get(header.navbarLinks).should('be.visible')
            .and('have.length', 3)
            .and('contain', 'Home')
            .and('contain', 'Sign in')
            .and('contain', 'Sign up')
    })

    it('contains correct elements when logged in', () => {
        cy.register()
        cy.visit('')
        cy.get(header.navbarLinks).should('be.visible')
            .and('have.length', 4)
            .and('contain', 'Home')
            .and('contain', 'New Article')
            .and('contain', 'Settings')
            .and('contain', 'cy')
    })
})
