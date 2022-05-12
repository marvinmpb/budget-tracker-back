-- Verify budget-tracker:init on pg

BEGIN;

SELECT * FROM "account" WHERE false;

SELECT * FROM "category" WHERE false;

SELECT * FROM "spent" WHERE false;

SELECT * FROM "user_token" WHERE false;

ROLLBACK;
