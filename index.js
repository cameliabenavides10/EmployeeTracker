const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         // MySQL username,
//         user: 'root',
//         // MySQL password
//         password: 'Winston123!',
//         database: 'company_db'
//     },
//     console.log(`Connected to the company_db database.`)
// );


function startApp(){
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
                    case "Done":
                        return doneChoice();
                        break;

                };
            });
    };

    async function viewAllEmployees() {
        try {
            const results = await db.query(
                `SELECT employees.id, employees.first_name AS "first name", employees.last_name
                AS "last name", role.title, departments.department AS department, roles.salary,
                concat(manager.first_name, " ", manager.last_name) AS manager
                FROM employees
                LEFT JOIN roles
                ON employees.role_id = role.id
                LEFT JOIN departments
                ON roles.departments_id = departments.id
                LEFT JOIN employees manager
                ON manager.id = employees.manager_id`);
            console.table(results);
            return results;
        } catch (err) {
            console.log(err);
        }
        mainMenu();
    };

    // async function addEmployee() {
    //  inquirer
    //         .prompt([
    //             {
    //                 type: 'input',
    //                 name: 'firstName',
    //                 message: 'What is the employees first name?',
    //             },
    //             {
    //                 type: 'input',
    //                 name: 'lastName',
    //                 message: 'What is the employees last name?',
    //             },
    //             {
    //                 type: 'input',
    //                 name: 'firstName',
    //                 message: 'What is the employees first name?',
    //             },
    //         ])

    // };

    // function updateRole() {

    // };

    // function viewRoles() {

    // };
    // function addRoles() {

    // };

    // function viewDepartments() {
    //     // query for viewdepartments db 
    // };
    // function addDepartments() {
    //     inquirer
    //         .prompt([
    //             {
    //                 type: 'input',
    //                 name: 'addDepart',
    //                 message: 'What department would you like to add?',
    //             }
    //         ])
    //         .then(function (data) {
    //             db.query(`INSERT INTO departments(department) VALUES ("${data.addDepart})`)
    //         });
    //     console.log(`\nNew department added!\n`);
    //     mainMenu();

    // };

mainMenu();
}

startApp();

