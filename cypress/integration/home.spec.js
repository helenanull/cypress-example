import home from '../selectors/home.sel'

// TODO: remove skip and fix once app is stable
describe.skip('Home page', () => {
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

    it('can see popular tags', () => {
        const apiUrl = Cypress.env('apiUrl')

        // delay tag request so we can test "loading tags..." text
        cy.intercept(`${apiUrl}/tags`, (req) => {
            req.continue((res) => {
                res.send({
                    delay: 2000
                })
            })
        }).as('tagRequest')

        cy.visit('')
        cy.get(home.sidebar).should('be.visible')
            .and('contain', 'Popular Tags')
        cy.get(home.loadingTagsText).should('be.visible')
            .and('contain', 'Loading tags...')
        cy.get(home.sidebarTags).should('not.exist')
        cy.get(home.loadingTagsText).should('not.be.visible')
        cy.get(home.sidebarTags).should('be.visible')
            .and('have.length', 20)
    })
})
