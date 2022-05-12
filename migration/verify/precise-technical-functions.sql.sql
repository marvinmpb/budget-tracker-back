-- Verify budget-tracker:precise-technical-functions.sql on pg

BEGIN;
 
SELECT update_category('{"name":"example"}'::json);

ROLLBACK;
