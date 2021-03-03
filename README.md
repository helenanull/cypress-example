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




# __Following best practices__

0. KISS [keep it simple, stupid]
2. Using shortcuts to test only one feature at a time
3. Tests are easily readable - __not__ using page objects pattern but keeping selectors (only selectors) separately as they are not easily readable
