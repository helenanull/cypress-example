module.exports = {
    yourFeedTab: '[ng-class*=feed]',
    globalFeedTab: '[ng-class*=all]',
    articles: 'article-list [ng-repeat*="ctrl.list"] .article-preview',
    sidebar: '.sidebar',
    sidebarTags: '.sidebar .tag-list',
    loadingTagsText: '.tag-list + div',
    firstFavoriteButton: 'article-list > article-preview:nth-child(1) button',
    readMoreLink: 'article-list > article-preview:nth-child(1) .preview-link'
}
