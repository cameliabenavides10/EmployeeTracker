USE company_db;

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Kevin', 'Mitnik', 1, NULL),
       ('Jack', 'Kilby', 2, 1),
       ('Joe Dee', 'Foster', 3, 1),
       ('Rick', 'Roll', 4, 1),
       ('Cristian','De La Fuente', 5, 1),
       ('Hunter S.', 'Thompson', 6, 1),
       ('Steve', 'Wozniak', 7, NULL),
       ('Pablo', 'Escobar', 8, NULL);

INSERT INTO departments (department)
VALUES ("Engineering"),
       ("Finance"),
       ("Legal"),
       ("HR"),
       ("IT"),
       ("Security");

INSERT INTO roles (role_title, salary, departments_id)
VALUES ("John", "Sierra", 1, null),
       ("Mike", "Hawkins", 2, 1),
       ("Ashley", "Martinez", 3, null),
       ("Kevin", "Lincoln", 4, 3),
       ("Kunal", "Chara", 5, null),
       ("Malia", "Goodwin", 6, 5),
       ("Sarah", "Totten", 7, null),
       ("Tom", "Leal", 8, 7);

