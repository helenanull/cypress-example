module.exports = {
    title: '.container h1',
    imageField: '[ng-model="$ctrl.formData.image"]',
    usernameField: '[ng-model="$ctrl.formData.username"]',
    bioField: '[ng-model="$ctrl.formData.bio"]',
    emailField: '[ng-model="$ctrl.formData.email"]',
    passwordField: '[ng-model="$ctrl.formData.password"]',
    submitButton: 'button[type="submit"]',
    logoutButton: 'button[ng-click="$ctrl.logout()"]',
    errorMessages: '.error-messages'
}
