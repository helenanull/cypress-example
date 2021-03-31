Cypress.Commands.add('createArticle', () => {
    const apiUrl = Cypress.env('apiUrl')

    cy.request({
        url: `${apiUrl}/articles`,
        method: 'POST',
        headers: {
            authorization: `Token ${window.localStorage.getItem('jwtToken')}`
        },
        body: {
            article: {
                title: 'My Cypress article',
                description: 'https://github.com/helenanull/cypress-example',
                body: 'This article is created by createArticle Cypress command',
                tagList: ['cypress', 'test-automation', 'simple']
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            return response.body.article.slug
        })
})
