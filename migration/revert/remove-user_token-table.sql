-- Revert budget-tracker:remove-user_token-table from pg

BEGIN;

-- user_token
CREATE TABLE "user_token" (
  "token" TEXT NOT NULL UNIQUE,
  "account_id" INTEGER NOT NULL REFERENCES "account"("id"),
  UNIQUE ("account_id")
);

COMMIT;
