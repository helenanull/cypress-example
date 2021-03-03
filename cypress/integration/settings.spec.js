import editor from '../selectors/editor.sel'
import article from '../selectors/article.sel'

describe('Article', () => {
    beforeEach(() => {
        cy.login()
        cy.visit('/editor/')
    })

    it('can create a new article', () => {
        cy.get(editor.titleField).type('My post title')
        cy.get(editor.aboutField).type('Cypress')
        cy.get(editor.bodyField).type('Cypress is so cool awyeah')
        cy.get(editor.tagsField).type('cypress, automation')
        cy.get(editor.publishButton).click()
        cy.get(article.title).should('be.visible')
            .and('have.text', 'My post title')
    })
})
