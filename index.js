const inquirer = require("inquirer");
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');
const jest = require('jest');
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");

const employees = []

function init() {
    generateHTML.startHtml();
    addManager();
}

function addManager() {
    inquirer.prompt([{
                message: "Enter manager's name",
                name: "name"
            },
            {
                message: "Enter  manager's id",
                name: "id"
            },
            {
                message: "Enter manager's email address",
                name: "email"
            },
            {
                message: "Enter manager's office number",
                name: "officeNum"
            }
        ])
        .then(function (response) {

            inquirer.prompt([{
                type: "list",
                message: "Would you like to add more team members?",
                choices: [
                    "yes",
                    "no"
                ],
                name: "moreMembers"
            }]).then(function (data) {
                let newMember;
                newMember = new Manager(response.name, response.id, response.email, response.officeNum);

                employees.push(newMember);
                generateHTML.addHtml(newMember).then(function () {
                    if (data.moreMembers == "yes") {
                        addMember();
                    } else {
                        generateHTML.finishHtml();
                    }
                })
            });

        }).catch(function (err) {
            console.log(err);
        });
}

function addMember() {
    inquirer.prompt([
            {
                message: "Enter team member's name",
                name: "name"
            },
            {
                type: "list",
                message: "Select team member's role",
                choices: [
                    "Engineer",
                    "Intern"
                ],
                name: "role"
            },
            {
                message: "Enter team member's id",
                name: "id"
            },
            {
                message: "Enter team member's email address",
                name: "email"
            }
        ])
        .then(function (response) {
            let roleInfo = "";
            if (response.role === "Engineer") {
                roleInfo = "GitHub username";
            } else if (response.role === "Intern") {
                roleInfo = "school name";
            }

            inquirer.prompt([{
                    message: `Enter team member's ${roleInfo}`,
                    name: "roleInfo"
                },
                {
                    type: "list",
                    message: "Would you like to add more team members?",
                    choices: [
                        "yes",
                        "no"
                    ],
                    name: "moreMembers"
                }
            ]).then(function (data) {
                let newMember;
                if (response.role == "Engineer") {
                    newMember = new Engineer(response.name, response.id, response.email, data.roleInfo);
                } else {
                    newMember = new Intern(response.name, response.id, response.email, data.roleInfo);
                }
                employees.push(newMember);
                generateHTML.addHtml(newMember)
                    .then(function () {
                        console.log(newMember)
                        if (data.moreMembers == "yes") {
                            addMember();
                        } else {
                            generateHTML.finishHtml();
                        }
                    });

            }).catch(function (err) {
                console.log(err);
            });;
        }).catch(function (err) {
            console.log(err);
        })

}


// Function call to initialize app
console.log("----------Employee Page Generator----------")
init()