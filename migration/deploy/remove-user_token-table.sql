-- Deploy budget-tracker:remove-user_token-table to pg

BEGIN;

DROP TABLE "user_token";

COMMIT;
