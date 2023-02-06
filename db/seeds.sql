USE company_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("John", "Sierra", 1, null),
       ("Mike", "Hawkins", 2, 1),
       ("Ashley", "Martinez", 3, null),
       ("Kevin", "Lincoln", 4, 3),
       ("Kunal", "Chara", 5, null),
       ("Malia", "Goodwin", 6, 5),
       ("Sarah", "Totten", 7, null),
       ("Tom", "Leal", 8, 7);

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

