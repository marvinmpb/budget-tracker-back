-- Verify budget-tracker:remove-user_token-table on pg

BEGIN;

SELECT * FROM "user_token" WHERE false;

ROLLBACK;
