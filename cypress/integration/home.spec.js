import home from '../selectors/home.sel'

describe('Home page', () => {
    it('contains correct elements when logged out', () => {
        cy.visit('')
        cy.get(home.globalFeedTab).should('be.visible')
            .and('contain', 'Global Feed')
            .and('have.css', 'color', 'rgb(92, 184, 92)')
        cy.get(home.yourFeedTab).should('not.be.visible')
        cy.get(home.articles).should('be.visible')
            .and('have.length', 10)
        cy.get(home.sidebar).should('be.visible')
        cy.get(home.sidebarTags).should('be.visible')
            .and('have.length', 20)
    })

    it('contains correct elements when logged in', () => {
        const apiUrl = Cypress.env('apiUrl')

        // mock my feed data
        cy.intercept(`${apiUrl}/articles/feed?limit=10*`, {
            fixture: 'my_feed'
        })
        cy.register()
        cy.visit('')
        cy.get(home.yourFeedTab).should('be.visible')
        cy.get(home.globalFeedTab).should('be.visible')
        cy.get(home.articles).should('be.visible')
            .and('have.length', 1)
        cy.get(home.sidebarTags).should('be.visible')
            .and('have.length', 20)
    })
})
