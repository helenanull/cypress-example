# **Simple** E2E test suite with Cypress
> **site:** http://angularjs.realworld.io/ [WIP] 

## :goal_net: Goals:
- keep it simple - no 'custom' abstractions/functions/utils/helpers (use what Cypress provides)
- tests are easily readable
- project is easily understandable even to people without previous JS or Cypress knowledge

![image](https://user-images.githubusercontent.com/48861601/110022516-af6f2400-7d34-11eb-8b13-f21789331cb3.png)


## :gear: Setup

1. `git clone https://github.com/helenanull/cypress-example.git`
2. cd to `cypress-example` folder and run `npm install`


## :heavy_check_mark: Run tests

- If you installed Cypress via npm: 
    - cypress test runner (cypress __open__):
      - **`npm run cy:open:web`** OR `cypress open --env device=web` (change web to mob to switch to mobile view)
    
    - cypress __headless mode__ (cypress run):
      - `npm run cy:run:web` OR `cypress run --env device=web`
- If you installed Cypress zip:
    - import **`cypress-example`** folder and you are good to go

## :bulb: Information

Tests are located in `cypress/integration` folder

Configuration files:
1. `cypress.json`
2. `plugins/index.js`

Custom commands (shortcuts) are located in `cypress/support` folder (`.cmd.js` suffix)

Selectors are located in `cypress/selectors` folder [only difference from cypress default project structure]
- __not__ using page objects pattern but keeping selectors (only selectors) separately as they are not easily readable and sometimes we need to share selectors between tests


## :grey_question: Q&A
1. Why keep selectors separately (not hard-coded to tests)
    - **tests are much more readable** - css selectors are by nature hard to read - even if we add data-test attributes. We might need 2nd child or want to verify that selector is a child for another element, like `.class2 > ul:nth-child(2)` (alternative `get().find()` or `get().parent()` is bad practice because of [this](https://docs.cypress.io/guides/core-concepts/retry-ability.html#Only-the-last-command-is-retried) )
    - in large projects, we might need to re-use the same selectors. Example: in login test, we want to verify that login was successful and we check settings link in header. But the same settings link is also used in header test.
    - selector and test logic is separated - when selector is updated, we just need to update selector file and not tests
2. Is it still E2E test if we use API to login in settings test?
     - since end result will be the same - it will catch exactly the same bugs as `full flow/user journey` E2E test would find, (we need to be careful not to leave 'gaps' though), it is E2E - tests are just separated and independent with this approach, **test suite is E2E**, one test might not be. 
4. Why mobile view is in config and not in test (like cy.viewport())?
    - we can't change userAgent in the middle of the test:
        https://github.com/cypress-io/cypress/issues/2100
        So it seems more correct to launch the tests with the correct config (--env device=mob/web)


## :link: Links

1. https://www.youtube.com/watch?v=5XQOK0v_YRE&ab_channel=OKG%21
2. https://docs.cypress.io/guides/references/best-practices.html
3. https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
