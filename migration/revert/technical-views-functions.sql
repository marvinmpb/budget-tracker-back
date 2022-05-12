-- Revert budget-tracker:technical-views-functions from pg

BEGIN;

DROP FUNCTION update_account(json);
DROP FUNCTION create_account(json);
DROP FUNCTION create_category(json);
DROP FUNCTION update_category(json);
DROP FUNCTION create_spent(json);

DROP VIEW account_view;
DROP VIEW category_view;
DROP VIEW spent_view;

COMMIT;
