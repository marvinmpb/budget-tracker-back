-- Verify budget-tracker:create-tables-team on pg

BEGIN;

SELECT * FROM "team" WHERE false;

SELECT * FROM "member" WHERE false;

SELECT * FROM "team_spent" WHERE false;

ROLLBACK;
