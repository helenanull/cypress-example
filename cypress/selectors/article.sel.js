module.exports = {
    title: '[ng-bind="::$ctrl.article.title"]',
    body: '[ng-bind-html*="ctrl.article.body"] p',
    editButton: 'h1 + article-actions [ui-sref*="ctrl.article.slug"]',
    deleteButton: 'h1 + article-actions .btn-outline-danger'
}
