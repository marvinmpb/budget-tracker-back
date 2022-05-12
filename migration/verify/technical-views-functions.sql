-- Verify budget-tracker:technical-views-functions on pg

BEGIN;

SELECT * FROM "account_view" WHERE false;
SELECT * FROM "category_view" WHERE false;
SELECT * FROM "spent_view" WHERE false;

SELECT create_account('{"firstname":"valentin","lastname":"furet","email":"valentindu69@laposte.fr","password":"1234567890","devise":"euro"}'::json);
SELECT create_category('{"name":"truc","icon":"toto"}'::json);
SELECT create_spent('{"amount":78,"comment":"une dépense","account_id":1}'::json);

SELECT update_account('{"firstname":"marvin","password":"hioerhghevh","id":1}'::json);
SELECT update_category('{"name":"example"}'::json);

ROLLBACK;
