module.exports = {
    title: '[ng-bind="::$ctrl.article.title"]',
    body: '[ng-bind-html*="ctrl.article.body"] p',
    editButton: 'h1 + article-actions [ui-sref*="ctrl.article.slug"]',
    deleteButton: 'h1 + article-actions .btn-outline-danger',
    tags: '.tag-list li',
    comments: '[ng-repeat*=".comments"] .card-block',
    commentField: '.card.comment-form textarea',
    postCommentButton: '.card.comment-form .btn',
    commentUsername: '.comment-author.ng-binding',
    banner: '.banner',
    author: '.banner .author',
    followButton: '.banner follow-btn',
    favoriteButton: '.banner favorite-btn',
    actions: '.article-actions',
    commentTextForLoggedOutUsers: 'p[show-authed=false]'
}
