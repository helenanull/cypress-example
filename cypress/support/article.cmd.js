Cypress.Commands.add('createArticle', () => {
    const apiUrl = Cypress.env('apiUrl')
    const link = 'https://github.com/helenanull/cypress-example'

    cy.request({
        url: `${apiUrl}/articles`,
        method: 'POST',
        headers: {
            authorization: `Token ${window.localStorage.getItem('jwtToken')}`
        },
        body: {
            article: {
                title: 'Article created by Cypress test',
                description: link,
                body: `This article is created with Cypress. See code here: ${link}`,
                tagList: ['cypress', 'simple', 'test-automation']
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(200)
            return response.body.article.slug
        })
})
