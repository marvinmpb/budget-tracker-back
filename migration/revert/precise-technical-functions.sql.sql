-- Revert budget-tracker:precise-technical-functions.sql from pg

BEGIN;

DROP FUNCTION update_category(json);

CREATE FUNCTION update_category (json) RETURNS category_view AS $$
	UPDATE "category" SET
		"name" = COALESCE($1->>'name', "name"),
		"color" = COALESCE($1->>'color', "color"),
		"icon" = COALESCE($1->>'icon', "icon")
	WHERE "id" = ($1->>'id')::integer
	RETURNING "id", "name", "color", "icon", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

COMMIT;
