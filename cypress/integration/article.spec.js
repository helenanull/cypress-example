import editor from '../selectors/editor.sel'
import article from '../selectors/article.sel'

describe('Article', () => {
    beforeEach(() => {
        cy.register().then((email) => {
            cy.login(email)
        })
    })
    it('can create a new article', () => {
        cy.visit('/editor/')
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type('Cypress is so cool awyeah')
        cy.get(editor.tagsField).type('cypress, automation')
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', 'My post title')
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
            .and('have.value', 'https://github.com/helenanull/cypress-example')
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
})
