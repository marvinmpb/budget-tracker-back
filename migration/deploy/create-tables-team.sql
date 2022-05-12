-- Deploy budget-tracker:create-tables-team to pg

BEGIN;

-- team
CREATE TABLE "team" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "invitation" TEXT UNIQUE,
  "owner_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE
);

-- member
CREATE TABLE "member" (
  "team_id" INTEGER REFERENCES "team"("id") ON DELETE CASCADE,
  "account_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE,
  UNIQUE ("teamId", "accountId")
);

-- team_spent
CREATE TABLE "team_spent" (
  "team_id" INTEGER REFERENCES "team"("id") ON DELETE CASCADE,
  "account_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE,
  "amount" INTEGER NOT NULL,
  "comment" TEXT NOT NULL
);

COMMIT;
