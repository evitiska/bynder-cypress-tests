[![Run tests](https://github.com/evitiska/bynder-cypress-tests/actions/workflows/runtests.yml/badge.svg?branch=main&event=push)](https://github.com/evitiska/bynder-cypress-tests/actions/workflows/runtests.yml)

### Bynder Cypress Test

This repository contains a basic test suite for Bynder's Wave Trial app:
- [Wave Trial](https://wave-trial.getbynder.com)

The suite is built using [Cypress](https://www.cypress.io/).

### Running the tests
---

After cloning this repository there are few options how to run the tests: 

#### Prerequisite
Set up the configuration values for the username and password to be used in a `cypress.env.json` file at the project root, such that the file contains these values:
```
{
    "USERNAME": "evitiska@gmail.com",
    "PASSWORD": "a_password"
}
```

### 1. Run Tests in a Docker Container
* Build the Docker image, for example `docker build -t bynder-cypress-tests .`
* Run the tests in a container `docker run bynder-cypress-tests` (add `--rm` to remove container after run)

### 2. Run Tests Manually
* Install dependencies `npm install`
* Run tests script `npm run cypress-tests` (runs all Cypress tests in the `tests` folder with default browser Chrome)

### 3. Run Tests using GitHub Actions
This repo is configured to run tests using GitHub Actions.

* Option 1: Push a new commit to `main` 
* Option 2: Manually trigger a workflow run:
  * Navigate to GitHub → Actions tab
  * Select the workflow and trigger it manually for a given branch
 
    
### Test Reports
After running the tests, a detailed report is generated using Mochawesome.

* The report can be found in the local directory: `mochawesome-report/reports`
* Screenshots taken during test execution are stored in: `mochawesome-report/assets`
* When using GitHub Actions, the test report can also be downloaded as an artifact from the workflow run.

## Gherkin Scenarios

```
Feature: Login Functionality

Background:
Given the user has opened the login page
    And the cookie banner is displayed
When the user accepts the cookies
Then the login form is visible

Scenario: User navigates to the login page and checks all main elements
Given the user is on the login page
Then the login form title is visible and contains the text "Wave"
    And the email field is visible and has the placeholder "Email/Username"
    And the password field is visible and has the placeholder "Password"
    And the login button is visible and contains the text "Login"
    And the forgot password link is visible and contains the text "Lost password?"
    And the logo is visible and contains the text "Bynder"
    And the language dropdown is visible and contains the text "Language"
    And the support button is visible and contains the text "Support"
    And the cookies preferences button is visible and contains the text "Cookies"

Scenario: User successfully logs in
Given the user provides valid credentials
    And the user clicks submit button
Then the user is redirected to the dashboard
    And the dashboard carousel is visible
When the user clicks on the profile link
Then the profiled drop down is open
    And the logout button should be visible
When the user clicks the logout button
Then the user is redirected to the login page
    And the login form is visible
    And a logout confirmation message is displayed

Scenario: User cannot log in with invalid credentials
Given the user provides an invalid username
    And the user provides an incorrect password
When the user clicks submit button
Then an error message is displayed on the login form
    And the error message says: `"You have entered an incorrect username or password."`

Scenario: User cannot access the dashboard by directly navigating through the link
Given the user navigates directly to the dashboard page
Then the user is redirected to the login page
    And the login form is visible

Scenario: User can change the language of the login page
Given the forgot password link is displayed on the login form
    And forgot password link text is: `"Lost password?"`
When the user opens the language dropdown
    And selects `"Nederlands (Nederland)"` language
Then the login form remains visible
    And the forgot password link text says `"Wachtwoord vergeten?"`
```
