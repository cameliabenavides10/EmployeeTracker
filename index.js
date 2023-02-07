const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const db = require("./lib/db");
const utils = require("util");
db.query = utils.promisify(db.query);



function startApp() {
    function mainMenu() {
        inquirer
            .prompt([{
                type: 'list',
                name: 'main',
                message: 'What would you like to do? ',
                choices: ["View all employees", "Add employee", "Update employee role",
                    "View all roles", "Add role", "View all departments", "Add department", "Done"]
            }
            ]).then(function (data) {

                switch (data.main) {
                    case "View all employees":
                        return viewAllEmployees();
                        break;
                    case "Add employee":
                        return addEmployee();
                        break;
                    case "Update employee role":
                        return updateRole();
                        break;
                    case "View all roles":
                        return viewRoles();
                        break;
                    case "Add role":
                        return addRoles();
                        break;
                    case "View all departments":
                        return viewDepartments();
                        break;
                    case "Add department":
                        return addDepartments();
                        break;
                    default:
                        process.exit();


                };
            });
    };

    async function viewAllEmployees() {

        try {
            const results = await db.query(
                `SELECT employees.id, employees.first_name AS "first name", employees.last_name
                AS "last name", roles.role_title, departments.department AS department, roles.salary,
                concat(manager.first_name, " ", manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = roles.roles_id
                LEFT JOIN departments
                ON roles.departments_id = departments.id
                LEFT JOIN employees manager
                ON manager.id = employees.manager_id`);
            console.table(results);
            mainMenu();
        } catch (err) {
            console.log(err);
        }
    };

    async function addEmployee() {
        let roles = await db.query('SELECT * FROM roles')
        let roleChoices = roles.map(({ roles_id, role_title }) => ({
            value: roles_id,
            name: role_title
        }))
        let manager = await db.query('SELECT * FROM employees')
        let managerChoices = manager.map(({ id, first_name, last_name }) => ({
            value: id,
            name: `${first_name} ${last_name}`
        }))

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'firstName',
                    message: 'What is the employees first name?',
                },
                {
                    type: 'input',
                    name: 'lastName',
                    message: 'What is the employees last name?',
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'What is the employee role?',
                    choices: roleChoices,
                },
                {
                    type: 'list',
                    name: 'managerChoices',
                    message: 'Who is the manager?',
                    choices: managerChoices,
                },
            ])
            .then(function (data) {
                db.query(`INSERT INTO employees(first_name, last_name, role_id, manager_id) VALUES ("${data.firstName}", "${data.lastName}", "${data.employeeRole}", "${data.managerChoices}")`);
                console.log("New employee has been added!");
                console.log(data.managerChoices);
                console.log(data.roleChoices);
                mainMenu();
            });

    };

    async function updateRole() {
        let employee = await db.query('SELECT * FROM employees')
        let employeeChoices = employee.map(({ first_name, last_name, id }) => ({
            value:id,
            name: `${first_name} ${last_name}`
        }))
        let roles = await db.query('SELECT * FROM roles')
        let roleChoices = roles.map(({ roles_id, role_title }) => ({
            value: roles_id,
            name: role_title
        }))

        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'employeeChosen',
                    message: 'Which employee would you like to update?',
                    choices: employeeChoices,
                },
                {
                    type: 'list',
                    name: 'roleChosen',
                    message: 'Choose a new role?',
                    choices: roleChoices,
                },
               
            ])
            .then(function(data) {
                db.query(`UPDATE employees SET role_id = "${data.roleChosen}" WHERE id = "${data.employeeChosen}"`);
                console.log("Your employee has been updated!");
                console.log(data.roleChosen);
                console.log(data.employeeChosen);
                mainMenu();
            });
    };

    async function viewRoles() {
        const roles = await db.query("SELECT roles.roles_id, roles.role_title, departments.department, roles.salary FROM roles JOIN departments ON roles.departments_id = departments.id")
        console.table(roles);
        mainMenu();
    };


    async function addRoles() {
        let departments = await db.query('SELECT * FROM departments')
        let departmentsChoices = departments.map(({ id, department }) => ({
            value: id,
            name: department
        }))

        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'roleName',
                    message: 'What is the role you would like to add?',
                },
                {
                    type: 'input',
                    name: 'roleSalary',
                    message: 'What is the salary for this role?',
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'What is the department for this role?',
                    choices: departmentsChoices,
                },
            ])
            .then(function (data) {
                db.query(`INSERT INTO roles(role_title, salary, departments_id) VALUES 
                ( "${data.roleName}", "${data.roleSalary}", "${data.employeeRole}")`);
                console.log("New role has been added!");
                mainMenu();
            });

    }

   async function viewDepartments() {
        try {
            const departments = await db.query("SELECT id, department FROM departments");
            console.table(departments);
            mainMenu();
        } catch (err) {
            console.log(err);
        }
    };



    function addDepartments() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'addDepart',
                    message: 'What department would you like to add?',
                }
            ])
            .then(function (data) {
                db.query(`INSERT INTO departments(department) VALUES ("${data.addDepart})`)
            });
        console.log(`\nNew department added!\n`);
        mainMenu();

    };
  mainMenu();
};
startApp();

