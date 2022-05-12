-- Deploy budget-tracker:technical-views-functions to pg

BEGIN;

-- ACCOUNT
CREATE VIEW account_view AS 
	SELECT "id", "lastname", "firstname", "email", "password", "avatar", "money_devise" AS "moneyDevise"
	FROM "account";

CREATE FUNCTION create_account (json) RETURNS account_view AS $$
	INSERT INTO "account" ("firstname", "lastname", "email", "password", "avatar", "money_devise") VALUES (
		$1->>'firstname',
		$1->>'lastname',
		$1->>'email',
		$1->>'password',
		$1->>'avatar',
		$1->>'moneyDevise'
	) RETURNING "id", "lastname", "firstname", "email", "password", "avatar", "money_devise" AS "moneyDevise";
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_account (json) RETURNS account_view AS $$
	UPDATE "account" SET 
		"firstname" = COALESCE($1->>'firstname', "firstname"),
		"lastname" = COALESCE($1->>'lastname', "lastname"),
		"email" = COALESCE($1->>'email', "email"),
		"password" = COALESCE($1->>'password', "password"),
		"avatar" = COALESCE($1->>'avatar', "avatar"),
		"money_devise" = COALESCE($1->>'moneyDevise', "money_devise")
	WHERE "id" = ($1->>'id')::integer
	RETURNING "id", "lastname", "firstname", "email", "password", "avatar", "money_devise" AS "moneyDevise";
$$ LANGUAGE SQL STRICT;


-- VIEW
CREATE VIEW category_view AS 
	SELECT "id", "name", "color", "icon", "account_id" AS "accountId"
	FROM "category";
	
CREATE FUNCTION create_category (json) RETURNS category_view AS $$
	INSERT INTO "category" ("name", "color", "icon", "account_id") VALUES (
		$1->>'name',
		$1->>'color',
		$1->>'icon',
		($1->>'accountId')::integer
	) RETURNING "id", "name", "color", "icon", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;

CREATE FUNCTION update_category (json) RETURNS category_view AS $$
	UPDATE "category" SET
		"name" = COALESCE($1->>'name', "name"),
		"color" = COALESCE($1->>'color', "color"),
		"icon" = COALESCE($1->>'icon', "icon")
	WHERE "id" = ($1->>'id')::integer
	RETURNING "id", "name", "color", "icon", "account_id" AS "accountId";
$$ LANGUAGE SQL STRICT;


-- SPENT
CREATE VIEW spent_view AS 
	SELECT "id", "amount", "comment", "date", "subscription", "account_id" AS "accountId", "category_id" AS "categoryId"
	FROM "spent";
	
CREATE FUNCTION create_spent (json) RETURNS spent_view AS $$
	INSERT INTO "spent" ("amount", "comment", "date", "subscription", "account_id", "category_id") VALUES (
		($1->>'amount')::integer,
		$1->>'comment',
		COALESCE(($1->>'date')::timestamptz, NOW()),
		COALESCE(($1->>'subscription')::boolean, false),
		($1->>'accountId')::integer,
		($1->>'categoryId')::integer
	) RETURNING "id", "amount", "comment", "date", "subscription", "account_id" AS "accountId", "category_id" AS "categoryId";
$$ LANGUAGE SQL STRICT;

COMMIT;
