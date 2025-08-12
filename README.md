# SauceDemo Product Data Extraction & Validation Automation

## Overview

This project automates the extraction of product data from [SauceDemo](https://www.saucedemo.com/) and validates it against a local MySQL database. It uses Playwright for UI automation, MySQL for DB validation, and Allure for reporting.

## Features

- Automated UI product extraction and validation
- Database sync and cross-checks
- Modular Page Object Model (POM) structure
- Allure reporting with UI & DB screenshots, queries, and matched data
- Data-driven, fully automated test cases

## Project Structure

```
/POC-AI_MCP
├── db/                # SQL scripts and DB helpers
├── pages/             # Playwright Page Objects
├── tests/             # Playwright test cases
├── utils/             # DB utility functions
├── reports/           # Allure and test reports
├── screenshots/       # UI screenshots
├── test_cases.csv     # Data-driven test case definitions
├── README.md          # This file
```

## Prerequisites

- Node.js (v16+ recommended)
- MySQL server (local or remote)
- Playwright (`npx playwright install`)
- Allure CLI (`npm install -g allure-commandline`)

## Setup

1. **Clone the repo**
2. **Install dependencies:**
   ```sh
   npm install
   npx playwright install
   ```
3. **Configure DB connection:**
   - Set environment variables (`DB_HOST`, `DB_USER`, `DB_PASS`, `DB_NAME`) as needed.
4. **Initialize the database:**
   - Run the SQL script:
     ```sh
     mysql -u <user> -p < db/init_saucedemo.sql
     ```

## Running Tests

```sh
npx playwright test tests/ --reporter=line,allure-playwright
```

## Generating Allure Report

```sh
npx allure generate ./allure-results --clean -o ./reports/allure-report
npx allure open ./reports/allure-report
```

## Allure Report: UI & DB Screenshots

Allure attaches screenshots and validation artifacts for every test step. To view them:

1. Open the Allure report as above.
2. Click any test case in the report.
3. Under the "Attachments" section, you will see:
   - **ui-screenshot**: Full-page UI screenshot at validation step
   - **db-query**: The SQL query used for validation
   - **db-result.json**: The DB query result
   - **ui-db-matched.json**: UI and DB data comparison

### Example Allure Report UI

**Allure Overview:**
![Allure Overview](docs/allure-overview.png)

**Allure Suite Details with Attachments:**
![Allure Suite Details](docs/allure-suite-details.png)

> _Samples: Allure report UI showing test results, suite details, and validation attachments._

## Artifacts in Allure

- UI screenshots for each validation (see Attachments in Allure)
- DB query and result attachments
- Matched UI↔DB data (JSON)

## Customization

- Add/modify test cases in `test_cases.csv`
- Update Page Objects in `pages/`
- Update DB helpers in `utils/dbUtils.ts`

## Authors

- Automation: Playwright, MySQL, Allure
- Prompt/Framework: Senior QA Automation Engineer

---

For any issues, please raise an issue or contact the maintainer.
