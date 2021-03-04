# Full E2E test suite with Cypress.io (for site:http://angularjs.realworld.io/) [WIP] 

Goals:
- keep it simple - no abstractions/functions/utils/helpers
- tests are easily readable
- project is easily understandable even to people without previous JS or Cypress knowledge

![image](https://user-images.githubusercontent.com/48861601/110022516-af6f2400-7d34-11eb-8b13-f21789331cb3.png)


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

Tests are located in `cypress/integration` folder

Configuration files:
1. `cypress.json`
2. `plugins/index.js`

Custom commands (shortcuts) are located in `cypress/support` folder (`.cmd.js` suffix)

Selectors are located in `cypress/selectors` folder [only difference from cypress default project structure]
- __not__ using page objects pattern but keeping selectors (only selectors) separately as they are not easily readable

# Q&A
1. Why mobile view is in config and not in test (like cy.viewport())?
- we can't change userAgent in the middle of the test:
https://github.com/cypress-io/cypress/issues/2100
So it seems more correct to launch the tests with the correct config (--env device=mob/web)


# __Following best practices__

1. https://www.youtube.com/watch?v=5XQOK0v_YRE&ab_channel=OKG%21
2. https://docs.cypress.io/guides/references/best-practices.html
3. https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
