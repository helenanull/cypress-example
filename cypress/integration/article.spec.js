import editor from '../selectors/editor.sel'
import article from '../selectors/article.sel'
import home from '../selectors/home.sel'

describe('Article', () => {
    const seeMoreLink = 'https://github.com/helenanull/cypress-example'

    beforeEach(() => {
        cy.register().then((response) => {
            cy.wrap(response.username).as('username')
        })
    })

    it('can create a new article', () => {
        cy.visit('/editor/')
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Simple automation project ${seeMoreLink}`)
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', 'My post title')
    })

    it('can add tags to article', () => {
        cy.visit('/editor/')
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Simple automation project ${seeMoreLink}`)
        cy.get(editor.tagsField).type('cypress{enter}')
        cy.get(editor.tagsField).should('have.value', '')
        cy.get(editor.addedTags).should('be.visible')
            .and('have.length', 1)
            .and('contain', 'cypress')
        cy.get(editor.tagsField).type('test-automation{enter}')
        cy.get(editor.tagsField).should('have.value', '')
        cy.get(editor.addedTags).should('be.visible')
            .and('have.length', 2)
            .and('contain', 'cypress')
            .and('contain', 'test-automation')
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', 'My post title')
        cy.get(article.tags).should('be.visible')
            .and('have.length', 2)
            .and('contain', 'cypress')
            .and('contain', 'test-automation')
    })

    it('logged out user can see article page', function () {
        cy.createArticle().then((link) => {
            // log out to visit article as logged out user
            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visit(`/article/${link}`)
        })
        cy.get(article.title).should('be.visible')
        cy.get(article.banner).should('be.visible')
        cy.get(article.author).should('be.visible')
            .and('have.text', this.username)
        cy.get(article.followButton).should('be.visible')
            .and('contain', `Follow ${this.username}`)
        cy.get(article.favoriteButton).should('be.visible')
        cy.get(article.body).should('be.visible')
        cy.get(article.commentTextForLoggedOutUsers).should('be.visible')
            .and('contain', 'Sign in or sign up to add comments on this article')
        cy.get(article.actions).should('be.visible')
    })

    it('can edit an article', () => {
        // we already know if creating an article works or not from the first test
        // we can now use a shortcut (cy.createArticle() command) to test other scenarios
        cy.createArticle().then((link) => {
            cy.visit(`/editor/${link}`)
        })
        cy.get(editor.titleField).should('be.visible')
            // to check field value, use have.value not have.text
            .and('have.value', 'Article created by Cypress test')
        cy.get(editor.aboutField).should('be.visible')
            .and('have.value', seeMoreLink)
        cy.get(editor.bodyField).clear()
            .type(`Test can edit an article. ${seeMoreLink}`)
        cy.get(editor.publishButton).click()
        cy.url().should('contain', '/article/Article-created-by-Cypress-test-')
        cy.get(article.title).should('be.visible')
        cy.get(article.body).should('be.visible')
            .and('have.text', `Test can edit an article. ${seeMoreLink}`)
    })

    it('can delete an article', () => {
        cy.intercept('DELETE', '/api/articles/**').as('deleteRequest')
        cy.createArticle().then((link) => {
            cy.visit(`/article/${link}`)
        })
        cy.get(article.title).should('be.visible')
        cy.get(article.deleteButton).click()
        cy.wait('@deleteRequest')
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it.skip('can favourite an article', () => {
        // TODO: remove skip and fix once app is stable
        const apiUrl = Cypress.env('newApiUrl')

        // create article to make sure there is at least one article to faviourite
        cy.createArticle()

        cy.intercept('POST', '/api/articles/*/favorite').as('addFavoriteReq')
        cy.visit('')
        cy.get(home.globalFeedTab).click()
        // articles are always changing on home page
        // we want to make sure we favorited the correct article
        // so we save the first article slug to compare later
        cy.get(home.readMoreLink).should('have.attr', 'href').then((slug) => {
            cy.get(home.firstFavoriteButton).click()
                .should('have.css', 'background-color', 'rgb(92, 184, 92)')
            cy.wait('@addFavoriteReq')
            cy.request('https://api.realworld.io/api/articles?limit=10&offset=0')
            cy.pause()

            // verify article was actually favorited
            cy.request(`${apiUrl}/articles?limit=10&offset=0`).then((resp) => {
                expect(resp.body.articles[0].slug).to.eq(slug)
            })
        })
    })
})
