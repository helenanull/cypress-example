import profile from '../selectors/profile.sel'

describe('Profile page', () => {
    beforeEach(() => {
        cy.register().then((response) => {
            // we need username to visit profile url
            cy.wrap(response.username).as('username')
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

    it('can see created articles', function () {
        cy.createArticle()
        cy.visit(`/@${this.username}`)
        cy.get(profile.articles).should('be.visible')
            .and('have.length', 1)
            .and('contain', 'Article created by Cypress test')
    })

    it('can see favorited articles', function () {
        const apiUrl = Cypress.env('apiUrl')
        // we already test adding favorite from UI in home spec
        // here we can use API to favourite an article and bypass UI
        cy.createArticle().then((link) => {
            // add newly created article to favorites
            cy.request({
                method: 'POST',
                url: `${apiUrl}/articles/${link}/favorite`,
                headers: {
                    authorization: `Token ${window.localStorage.getItem('jwtToken')}`
                }
            })
        })
        cy.visit(`/@${this.username}`)
        cy.get(profile.favouritedArticlesTab).click()
        cy.get(profile.articles).should('be.visible')
            .and('have.length', 1)
            .and('contain', 'Article created by Cypress test')
    })

    it('can see favorited articles - mock response', function () {
        const apiUrl = Cypress.env('apiUrl')
        // example how to mock favourited articles list
        cy.intercept(`${apiUrl}/articles?favorited=${this.username}&limit=5&offset=0*`, {
            fixture: 'favorited_list'
        })
        cy.visit(`/@${this.username}`)
        cy.get(profile.favouritedArticlesTab).click()
        cy.get(profile.articles).should('be.visible')
            .and('have.length', 1)
            .and('contain', 'My Cypress article')
    })
})
