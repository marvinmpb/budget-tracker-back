-- Revert budget-tracker:init from pg

BEGIN;

DROP TABLE "user_token", "spent", "category", "account";

COMMIT;
