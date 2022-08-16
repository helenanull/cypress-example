import article from '../selectors/article.sel'

describe('Comments', () => {
    beforeEach(() => {
        cy.register().then((response) => {
            cy.wrap(response.username).as('username')
        })
        cy.createArticle().then((link) => {
            cy.intercept('/api/articles/*/comments').as('commentsRequest')
            cy.visit(`/article/${link}`)
            // wait for comments to be loaded before starting with tests
            cy.wait('@commentsRequest')
        })
    })

    it('can add a comment to article', function () {
        cy.get(article.comments).should('have.length', 0)
        cy.get(article.commentField).type('Cypress comment')
        cy.get(article.postCommentButton).should('contain', 'Post Comment').click()
        cy.get(article.comments).should('be.visible')
            .and('have.length', 1)
        cy.get(article.commentField).should('have.value', '')
        cy.get(article.commentUsername).should('be.visible')
            .and('have.text', this.username)
    })
})
