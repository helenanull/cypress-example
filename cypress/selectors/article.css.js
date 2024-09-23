module.exports = {
    title: '.article-page h1',
    body: ' .page .article-content p',
    editButton: 'h1 + article-actions [ui-sref*="ctrl.article.slug"]',
    deleteButton: '.article-actions .ion-trash-a',
    tags: '.tag-list li',
    comments: '.comment-form+.card .card-block',
    commentField: '.card.comment-form textarea',
    postCommentButton: '.card.comment-form .btn',
    commentUsername: '.card a:nth-child(2).comment-author ',
    banner: '.banner',
    author: '.banner .author',
    followButton: '.banner .action-btn',
    favoriteButton: ' .banner .btn-outline-primary',
    actions: '.article-actions',
    commentTextForLoggedOutUsers: '.container.page .article-actions+.row span'
}
