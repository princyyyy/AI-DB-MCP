# Test Execution Summary

## Date

12 August 2025

## Test Suite

SauceDemo Product Data Extraction & Validation Automation

## Results

- **Total Tests:** 12
- **Passed:** 12
- **Failed:** 0
- **Skipped:** 0

## UI ↔ DB Comparison

| Test Case                                                                    | Matched | Details                                                                          |
| ---------------------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------- |
| TC01: Verify all products are displayed after login                          | ✅      | All 6 products in the UI matched the DB records by name, description, and price. |
| TC02: Verify product details match DB for Sauce Labs Backpack                | ✅      | UI details for 'Sauce Labs Backpack' matched DB record exactly.                  |
| TC03: Verify product details match DB for Sauce Labs Bike Light              | ✅      | UI details for 'Sauce Labs Bike Light' matched DB record exactly.                |
| TC04: Verify product details match DB for Sauce Labs Bolt T-Shirt            | ✅      | UI details for 'Sauce Labs Bolt T-Shirt' matched DB record exactly.              |
| TC05: Verify product details match DB for Sauce Labs Fleece Jacket           | ✅      | UI details for 'Sauce Labs Fleece Jacket' matched DB record exactly.             |
| TC06: Verify product details match DB for Sauce Labs Onesie                  | ✅      | UI details for 'Sauce Labs Onesie' matched DB record exactly.                    |
| TC07: Verify product details match DB for Test.allTheThings() T-Shirt (Red)  | ✅      | UI details for 'Test.allTheThings() T-Shirt (Red)' matched DB record exactly.    |
| TC08: Verify adding 'Sauce Labs Backpack' to cart reflects correct details   | ✅      | Cart details for 'Sauce Labs Backpack' matched DB record exactly.                |
| TC09: Verify adding 'Sauce Labs Bike Light' to cart reflects correct details | ✅      | Cart details for 'Sauce Labs Bike Light' matched DB record exactly.              |
| TC10: Verify all product prices in UI match DB                               | ✅      | All product prices in UI matched DB records.                                     |
| TC11: Verify product count in UI matches DB                                  | ✅      | UI product count matched DB product count.                                       |

All test cases matched between UI and DB. No mismatches detected.

## Artifacts

- Allure report: `reports/allure-report/`
- UI screenshots: `screenshots/`
- DB query results: attached in Allure report
- Matched UI↔DB data: attached in Allure report

## Execution Time

- ~6 seconds (Playwright parallel run)

## Issues/Failures

- None

## Next Steps

- Review Allure report for detailed step-by-step validation and attachments.
- Add more edge cases or negative tests if required.

---

Generated automatically after test suite execution.
