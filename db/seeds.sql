USE company_db;

INSERT INTO departments (department)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("HR"),
       ("IT"),
       ("Security");

INSERT INTO roles (role_title, salary, departments_id)
VALUES ('CEO Senior Engineer', 425000, 8),
       ('Electrical Engineer', 200000, 7),
       ('Software Engineer', 185000, 1),
       ('Lawyer', 300000, 3),
       ('Accountant', 125000, 2),
       ('HR Rep', 100000, 4),
       ('Director of IT', 250000, 5),
       ('Head of Security', 115000, 6);

-- INSERT INTO employees (first_name, last_name, role_id, manager_id)
-- VALUES ('Kevin', 'Mitnik', 1, NULL),
--        ('Jack', 'Kilby', 2, 1),
--        ('Joe Dee', 'Foster', 3, 1),
--        ('Rick', 'Roll', 4, 1),
--        ('Cristian','De La Fuente', 5, 1),
--        ('Hunter S.', 'Thompson', 6, 1),
--        ('Steve', 'Wozniak', 7, NULL),
--        ('Pablo', 'Escobar', 8, NULL);