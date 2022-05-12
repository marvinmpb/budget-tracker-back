-- Deploy budget-tracker:default-categories to pg

BEGIN;

INSERT INTO "category" ("name", "color", "icon") VALUES 
('Shopping', '#E71313', 'fa-solid fa-cart-arrow-down'),
('Transport', '#356FE2', 'fa-solid fa-bus'),
('Alimentation', '#E7E22D', 'fas fa-utensils'),
('Véhicule', '#6B28D8', 'fa-solid fa-car-side'),
('Maison', '#22CDE1', 'fa-solid fa-house'),
('Soin', '#47DC1B', 'fa-solid fa-kit-medical');

COMMIT;