# **Simple** E2E test suite with Cypress
[![cypress-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/urshkd&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/urshkd/runs) [![cypress-example](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/count/urshkd&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/urshkd/runs)
> **application under test:** http://angularjs.realworld.io/

## :goal_net: Goals
- keep it simple - no 'custom' abstractions/functions/utils/helpers (use what Cypress provides)
- tests are easily readable
- project is easily understandable even to people without previous JS or Cypress knowledge
- [use shortcuts](https://docs.cypress.io/api/cypress-api/custom-commands#4-Skip-your-UI-as-much-as-possible) to avoid repeating/testing the same UI actions over and over again

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
#### :test_tube: Tests:
:file_folder: Tests are located in `cypress/integration` folder

:file_folder: Custom commands are located in `cypress/support` folder (`.cmd.js` suffix)

:file_folder: Selectors (CSS selectors) are located in `cypress/selectors` folder [only difference from cypress default project structure] - __not__ using page object model(POM) design pattern but keeping selectors (only selectors) separately [Read more](https://github.com/helenanull/cypress-example#grey_question-qa)

#### :hammer_and_wrench: Configuration
Config files:
1. `cypress.json` - Main config file where default behavior of Cypress can be modified. [More info](https://docs.cypress.io/guides/references/configuration#cypress-json)
2. `plugins/index.js` - Plugins file is where we can programmatically alter the resolved configuration [More info](https://docs.cypress.io/guides/tooling/plugins-guide#Use-Cases)

This test suite is supporting multiple viewports (mobile and desktop). 

One solution is to use [cy.viewport()](https://docs.cypress.io/api/commands/viewport) command inside the test, to change the viewports, but very often websites also check user agent to get the device information(and show the mobile view). Since user agent is something [we can't change in the middle of the test](https://github.com/cypress-io/cypress/issues/2100), we need to pass config value when launching tests. In `cypress.json` we have a `device` parameter and in plugins file `index.js`, we decide viewports and user agent parameter values based on device value.

#### :diamond_shape_with_a_dot_inside: IDE setup and recommended extensions
- [VS Code](https://code.visualstudio.com/download) with following extensions:
    - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - to keep your code tidy
    - [Add Only](https://marketplace.visualstudio.com/items?itemName=ub1que.add-only) - enables to add/remove `.only` with one click
    - [VScode-icons](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)


## :grey_question: Q&A
1. Why keep selectors separately (not hard-coded to tests)
    - **tests are much more readable** - css selectors are by design hard to read - even if we add data-test attributes. We might need a 2nd child or want to verify that a selector is a child for another element, like `.class2 > ul:nth-child(2)` (alternative `get().find()` or `get().parent()` is bad practice because of [this](https://docs.cypress.io/guides/core-concepts/retry-ability.html#Only-the-last-command-is-retried) )
    - in large projects, we might need to re-use the same selectors. Example: in login test, we want to verify that login was successful and for that, we check settings link visibility in header. But the same settings link is also used in header test.
    - selector and test logic is separated - when selector is updated, we just need to update 1 selector file and not multiple tests
2. Is it still E2E test if we use API's instead of UI?
     - all functionality should be tested from UI **once**. There is no reason to repeat the same UI actions over and over again in each test. [Edit article example](https://github.com/helenanull/cypress-example/blob/main/cypress/integration/article.spec.js#L69). End result will be the same - it will catch exactly the same bugs as `full flow/user journey` test would find, (we need to be careful not to leave 'gaps' though) - tests are just separated and independent with this approach, **test suite is still E2E**. Example: We have a bug where login button is not working - our settings test would pass(if there are no bugs in settings), but login test would still fail.


## :link: Links

1. https://www.youtube.com/watch?v=5XQOK0v_YRE&ab_channel=OKG%21
2. https://docs.cypress.io/guides/references/best-practices.html
3. https://docs.cypress.io/api/cypress-api/custom-commands.html#Best-Practices
