-- Deploy budget-tracker:team-views to pg

BEGIN;

CREATE VIEW team_view AS 
  SELECT "id", "name", "invitation", "owner_id" AS "ownerId"
  FROM "team";

COMMIT;
