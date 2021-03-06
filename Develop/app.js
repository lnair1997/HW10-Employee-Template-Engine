const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Employee Array ----------------------------------------------------------------------------------------
let employees = [];

// Adding Employee ---------------------------------------------------------------------------------------
function addEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select a Team Member from the list below.",
            name: "teamMembers",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                "I don't want to add a Team Member",
            ]
        }
    ]).then(userChoice => {
        if (userChoice.teamMembers === "Manager") {
            createManager();
        } else if (userChoice.teamMembers === "Engineer") {
            createEngineer();
        } else if (userChoice.teamMembers === "Intern") {
            createIntern();
        } else {
            if (employees.length > 0) {
                const html = render(employees);
                fs.writeFile(outputPath, html, (err) => err ? console.log(err) : console.log("Successful in writing a team.html file"));
                return;
            } else {
                console.log("No employee created");
            }
        }
    })
};

addEmployee();

// Creating Manager ---------------------------------------------------------------------------------------
function createManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Manager's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Manager's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Manager's office number?",
            name: "officeNumber"
        }
    ]).then(data => {
        console.log("Manager Added!");
        let manager = new Manager(data.name, data.id, data.email, data.officeNumber);
        employees.push(manager);
        addEmployee();
    })
};

// Creating Engineer ---------------------------------------------------------------------------------------
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Engineer's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Engineer's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Engineer's Github username?",
            name: "gitHub"
        }
    ]).then(data => {
        console.log("Engineer Added!");
        let engineer = new Engineer(data.name, data.id, data.email, data.gitHub);
        employees.push(engineer);
        addEmployee();
    })
};

// Creating Intern ---------------------------------------------------------------------------------------
function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the Intern's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the Intern's email?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the Intern's school name?",
            name: "school"
        }
    ]).then(data => {
        console.log("Intern Added!");
        let intern = new Intern(data.name, data.id, data.email, data.school);
        employees.push(intern);
        addEmployee();
    })
};

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
