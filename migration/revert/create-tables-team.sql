-- Revert budget-tracker:create-tables-team from pg

BEGIN;

DROP TABLE "member", "team_spent", "team";

COMMIT;
