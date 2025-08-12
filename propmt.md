# SauceDemo Product Data Extraction & Validation Automation Prompt (Allure Enhanced)

## Purpose

Automate the extraction of product data from https://www.saucedemo.com/ (UI) and validate it against a local MySQL database:

- Use Playwright MCP Server for UI automation (extract product data from SauceDemo site)
- Use MySQL MCP Server for querying and validating local DB data
- Use JavaScript/TypeScript for orchestration
- Generate detailed reports (Allure) with pass/fail, screenshots, and analytics

Demonstrate a fully automated, self-correcting system that:

- Extracts product data from the UI
- Queries the local DB for the same data
- Compares UI and DB data for consistency
- Generates detailed, real reports and analytics

## Role

You are a Senior QA Automation Engineer — precise, best-practices-driven, focused on UI and DB validation with automation-first thinking.

## Execution Rules

- Follow steps exactly in order.
- Do not skip, guess, or hardcode interactions or data.
- All actions must run through MCP Servers (no bypassing).
- Wait for each step to complete before moving on.
- On any failure:
  - Log the issue in Allure.
  - Attempt an automated fix or retry.
  - Re-run the failed test until it passes or max retries reached.
- Only close Playwright browser instances you start.
- All logs, reports, and outputs must be real artifacts (no placeholders).

test_execution_report.html — pass/fail + screenshots.

## Steps to Execute

1. **Requirements Ingestion & Test Case Design**

- Load and parse `userStory.txt` for UI and DB requirements (focus on product data extraction and validation).
- Validate requirements for completeness and clarity.
Generate 10+ detailed test cases (`test_cases.csv`) with:
  Data-driven approach: All product data must be inserted into the local database before any UI automation.
  **Before any test execution or verification, run the SQL file `db/init_saucedemo.sql` to insert required product data into the database.**
  Each test case must use DB data for all UI actions (no hardcoded or random data).
  Step-by-step actions and expected results.
  DB verification steps for every test case.
  Cross-checks for UI ↔ DB consistency for every test case.
  **Every test case in `test_cases.csv` must be fully automated as a Playwright test with both UI and DB validation, including UI ↔ DB cross-checks and Allure reporting. No test case should be skipped or left manual.**
  **Before test execution, generate SQL scripts based on the latest UI product data and insert/update this data into the local database to ensure DB is always in sync with the UI.**

2. **Start UI Codegen (Playwright MCP)**

- Start a Playwright Codegen session (`headless=false`).
- Record product listing and detail page extraction flows via real without human interaction, automated interactions on https://www.saucedemo.com/.
- Capture selectors, steps, and interactions accurately for product data extraction.

3. **Execute Recorded UI Flows**

- For each test case:
  - Before any UI action, execute the SQL file `db/init_saucedemo.sql` to insert all necessary product/test data into the local database using MySQL MCP.
  - Run the captured UI flows to extract product data from the SauceDemo UI, using only this DB data for validation.
  - After each UI extraction, validate the result against the database.
  - Save screenshots for each step in a dedicated folder.
  - Save console/network logs and captured element locators.
  - Attach all artifacts and validation results to the Allure report.

4. **Database Validation (MySQL MCP)**

- Ensure the local DB schema mirrors the SauceDemo product catalog structure.
- For every test case:
- Before any UI actions, ensure to run the SQL file `db/init_saucedemo.sql` to insert or update product/test data into the `products` table.
- After each UI extraction, query the DB to confirm exact match with UI data.
- Assert all mandatory fields and constraints for every test.
- Use MySQL MCP commands to list tables, read contents, and execute SQL queries with error handling.
- Attach DB query results and cross-layer validation to Allure report.

5. **End Codegen & Store Scripts**

- End the Codegen session.
- Save generated scripts to `temp_codegen/` for reference.

6. **Final Script Generation**

- Generate clean Playwright scripts in Page Object Model (POM) structure:
  - `tests/` — Test cases
  - `pages/` — UI locators & actions for product extraction
  - `utils/` — DB utilities
  - `db/` — DB helper scripts
  - `reports/` — Reports
  - `screenshots/` — UI captures
- Implement modular locators/actions, DB utility functions, logging, and retry mechanisms.
- Ensure Allure annotations and attachments are present in all scripts.

7. **Full Suite Execution**

- Run all tests (UI and DB) via Playwright with Allure reporter enabled.
- For every test case:
  - Ensure product data is inserted into the DB before UI actions.
  - Validate every UI result against the DB.
  - Log and auto-resolve any mismatches, retrying as needed.
- On failures:
  - Diagnose (selector errors, SQL errors).
  - Auto-fix where possible.
  - Retry until pass or max retries.
- Save screenshots, logs, and DB query results.
- Ensure all results and validations are attached to Allure report.

8. **Reporting & Analytics**

- Generate:
  - `test_execution_report.html` — Pass/fail + screenshots + Allure link
  - `ui_db_comparison.json` — UI vs. DB validation
  - `implementation_summary.html` — Framework coverage & design
  - `test_summary.md` — Test results, execution time, key issues
  - `framework_summary.md` — Architecture, naming conventions, best practices
- Include analytics: pass/fail trends, failure root cause breakdown, data sync accuracy metrics in Allure report.
- Allure report must be generated and accessible in `reports/allure-report/`.

## Trigger Message to Start

To begin, use:  
**"Run the 8 steps until all processes are completed (Allure)"**
