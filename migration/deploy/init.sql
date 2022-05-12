-- Deploy budget-tracker:init to pg

BEGIN;

-- account
CREATE TABLE "account" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "firstname" TEXT NOT NULL,
  "lastname" TEXT NOT NULL,
  "email" TEXT NOT NULL UNIQUE,
  "password" TEXT NOT NULL,
  "avatar" TEXT,
  "money_devise" TEXT
);

-- category
CREATE TABLE "category" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" TEXT NOT NULL,
  "color" VARCHAR(7),
  "icon" TEXT NOT NULL,
  "account_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE,
  UNIQUE ("name", "account_id") 
);

-- spent
CREATE TABLE "spent" (
  "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "amount" INTEGER NOT NULL CHECK ( "amount" > 0 ),
  "comment" TEXT NOT NULL,
  "date" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "subscription" BOOLEAN NOT NULL DEFAULT false,
  "account_id" INTEGER REFERENCES "account"("id") ON DELETE CASCADE,
  "category_id" INTEGER REFERENCES "category"("id") ON DELETE CASCADE
);

-- user_token
CREATE TABLE "user_token" (
  "token" TEXT NOT NULL UNIQUE,
  "account_id" INTEGER NOT NULL REFERENCES "account"("id") ON DELETE CASCADE,
  UNIQUE ("account_id")
);

COMMIT;
