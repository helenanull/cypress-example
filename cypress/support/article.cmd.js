Cypress.Commands.add('createArticle', () => {
    const apiUrl = Cypress.env('apiUrl')
    const link = 'https://github.com/bigbytecy/bigbyte-example-project'
    const authToken = JSON.parse(window.localStorage.getItem('loggedUser')).headers.Authorization
    const randomPostTitle = `My post title ${Math.random().toString().slice(2, 11)}`

    cy.request({
        url: `${apiUrl}/articles`,
        method: 'POST',
        headers: {
            authorization: authToken
        },
        body: {
            article: {
                title: randomPostTitle,
                description: link,
                body: `This article is created with Cypress. See code here: ${link}`,
                tagList: ['cypress', 'simple', 'test-automation']
            }
        }
    })
        .then((response) => {
            expect(response.status).to.eq(201)
            return {
                slug: response.body.article.slug,
                title: response.body.article.title
            }
        })
})
