Cypress.Commands.add('createArticle', () => {
    cy.request({
        url: 'https://conduit.productionready.io/api/articles',
        method: 'POST',
        headers: {
            authorization: `Token ${window.localStorage.getItem('jwtToken')}`
        },
        body: {
            article: {
                title: 'My Cypress article',
                description: 'https://github.com/helenanull/cypress-example',
                body: 'This article is created by createArticle Cypress command',
                tagList: []
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            return response.body.article.slug
        })
})
