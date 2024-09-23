import editor from '../selectors/editor.css'
import article from '../selectors/article.css'

describe('Article', () => {
    const seeMoreLink = 'https://github.com/helenanull/cypress-example'

    beforeEach(() => {
        cy.register().then((response) => {
            cy.wrap(response.username).as('username')
        })
    })

    it('can create a new article', () => {
        const uniqueTitle = `Title cy${Math.random().toString().slice(2, 8)}`

        cy.visit('/editor/')
        cy.get(editor.titleField).type(uniqueTitle)
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Simple automation project ${seeMoreLink}`)
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', uniqueTitle)
        // check there are no tags added
        cy.get(article.tags).should('not.exist')
    })

    it('can add tags to article', () => {
        const uniqueTitle = `Title cy${Math.random().toString().slice(2, 8)}`

        cy.visit('/editor/')
        cy.get(editor.titleField).type(uniqueTitle)
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Simple automation project ${seeMoreLink}`)
        cy.get(editor.tagsField).type('cypress, automation, training')
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', uniqueTitle)
        cy.get(article.tags).should('be.visible')
            .and('have.length', 3)
            .and('contain', 'cypress')
            .and('contain', 'automation')
            .and('contain', 'training')
    })

    it.only('logged out user can see article page', function () {
        cy.createArticle().then(({ slug }) => {
            // log out to visit article as logged out user
            cy.clearCookies()
            cy.clearLocalStorage()
            cy.visit(`/article/${slug}`)
        })
        cy.get(article.title).should('be.visible')
        cy.get(article.banner).should('be.visible')
        cy.get(article.author).should('be.visible')
            .and('have.text', this.username)
        cy.get(article.followButton).should('be.visible')
            .and('contain', 'Followers')
        cy.get(article.favoriteButton).should('be.visible')
        cy.get(article.body).should('be.visible')
        cy.get(article.commentTextForLoggedOutUsers).should('be.visible')
            .and('contain', 'add comments on this article.')
        cy.get(article.actions).should('be.visible')
    })

    it('can edit an article', () => {
        // we already know if creating an article works or not from the first test
        // we can now use a shortcut (cy.createArticle() command) to test other scenarios
        cy.createArticle().then(({ slug }) => {
            cy.visit(`/editor/${slug}`)
        })
        cy.get(editor.titleField).should('be.visible')
        cy.get(editor.aboutField).should('be.visible')
            .and('have.value', seeMoreLink)
        cy.get(editor.bodyField).clear()
            .type(`Test can edit an article. ${seeMoreLink}`)
        cy.get(editor.publishButton).click()
        cy.url().should('contain', '/article/my-post-title-')
        cy.get(article.title).should('be.visible')
        cy.get(article.body).should('be.visible')
            .and('have.text', `Test can edit an article. ${seeMoreLink}`)
    })

    it('can delete an article', () => {
        cy.intercept('DELETE', '/api/articles/**').as('deleteRequest')
        cy.createArticle().then(({ slug }) => {
            cy.visit(`/article/${slug}`)
        })
        cy.get(article.title).should('be.visible')
        cy.get(article.deleteButton).click()
        cy.wait('@deleteRequest')
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })
})
