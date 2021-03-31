import editor from '../selectors/editor.sel'
import article from '../selectors/article.sel'
import home from '../selectors/home.sel'

describe('Article', () => {
    const articleLink = 'https://github.com/helenanull/cypress-example'

    beforeEach(() => {
        cy.register().then((email) => {
            cy.wrap(email.split('@')[0]).as('username')
            cy.login(email)
        })
    })

    it('can create a new article', () => {
        cy.visit('/editor/')
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Cypress is so cool awyeah! ${articleLink}`)
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', 'My post title')
    })

    it('can add tags to article', () => {
        cy.visit('/editor/')
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type(`Cypress is so cool awyeah! ${articleLink}`)
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

    it('can edit an article', () => {
        // we already know if creating an article works or not from the first test
        // we can now use shortcut (cy.createArticle() command) to test other scenarios
        cy.createArticle().then((link) => {
            cy.visit(`/editor/${link}`)
        })
        cy.get(editor.titleField).should('be.visible')
            // to check field value, use have.value not have.text
            .and('have.value', 'My Cypress article')
        cy.get(editor.aboutField).should('be.visible')
            .and('have.value', articleLink)
        cy.get(editor.bodyField)
            .should('have.value', 'This article is created by createArticle Cypress command')
            .clear()
            .type('This is modified body')
        cy.get(editor.publishButton).click()
        cy.url().should('contain', '/article/my-cypress-article-')
        cy.get(article.title).should('be.visible')
        cy.get(article.body).should('be.visible')
            .and('have.text', 'This is modified body')
    })

    it('can delete an article', () => {
        cy.intercept('DELETE', '/api/articles/**').as('deleteRequest')
        cy.createArticle().then((link) => {
            cy.visit(`/article/${link}`)
        })
        cy.get(article.title).should('be.visible')
        cy.get(article.deleteButton).click()
        cy.wait('@deleteRequest').then((req) => {
            expect(req.response.statusCode).to.eq(200)
        })
        cy.url().should('eq', `${Cypress.config('baseUrl')}/`)
    })

    it('can favourite an article', function () {
        const apiUrl = Cypress.env('apiUrl')
        let slug = ''

        cy.intercept('POST', '/api/articles/*/favorite').as('addFavoriteReq')
        cy.visit('')
        cy.get(home.globalFeedTab).click()
        // articles are always changing on home page
        // we want to make sure we favourited the correct article
        // so we save the first article slug to compare later
        cy.get(home.readMoreLink).should('have.attr', 'href').then((link) => {
            slug = link.split('/')[2]
        })
        cy.get(home.firstFavoriteButton).click()
            .should('have.css', 'background-color', 'rgb(92, 184, 92)')
        cy.wait('@addFavoriteReq')

        // verify article was actually favourited
        cy.request(`${apiUrl}/articles?favorited=${this.username}&limit=5&offset=0`).then((resp) => {
            expect(resp.body.articles[0].slug).to.eq(slug)
        })
    })
})
