# example tests using cypress __[and keeping it simple]__

# 1. Setup

`npm install`

# 2. Run tests

cypress test runner (cypress __open__):

`npm run cypress open --env device=mob`

`npm run cypress open --env device=web`


cypress __headless mode__ (cypress run):

`npm run cypress run --env device=mob`

`npm run cypress run --env device=web`

# Information

Goal is to have full E2E suite, that is easily understandable even to people without previous JS or Cypress knowledge.

Tests are located in `cypress/integration` folder

Configuration files:
1. cypress.json
2. plugins/index.js

Custom commands (shortcuts) are located in `cypress/support` folder (`.cmd.js` suffix)

Why mobile view is in config and not in test (like cy.viewport())?
- we can't change userAgent in the middle of the test:
https://github.com/cypress-io/cypress/issues/2100
So it seems more correct to launch the tests with the correct config (--env device=mob/web)


# __Following best practices__

0. KISS [keep it simple, stupid]
2. Using shortcuts to test only one feature at a time
3. Tests are easily readable - __not__ using page objects pattern but keeping selectors (only selectors) separately as they are not easily readable
