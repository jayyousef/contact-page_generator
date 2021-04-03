const inquirer = require("inquirer");
const fs = require('fs');
const generateHTML = require('./utils/generateHTML');
const jest = require('jest');
// const Engineer = require("./lib/Engineer");
// const Intern = require("./lib/Intern");
// const Manager = require("./lib/Manager");

const employees = []

class Employee {
    constructor(name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email;

    }
    getName() {
        return this.name
    }
    getId() {
        return this.id
    }
    getEmail() {
        return this.email
    }
    getRole() {
        return 'Employee';
    }
}

class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    getRole() {
        return 'Manager';
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}
class Engineer extends Employee {
    constructor(name, id, email, gitHub) {
        super(name, id, email);
        this.gitHub = gitHub;
    }
    getGithub() {
        return this.gitHub
    }
    getRole() {
        return 'Engineer';
    }
}

class Intern extends Employee {
    constructor(name, id, email, school) {
        super(name, id, email);
        this.school = school;
    }
    getSchool() {
        return this.school
    }
    getRole() {
        return 'Intern';
    }
}

// const Jay = new Employee('Jay', 119, 'jay@work');
// const Boss = new Manager('Manager', 120, 'boss@work', 112)
// const Engineer1 = new Engineer('Engineer1', 121, 'enginner@work', 'githubprofile')
// const intern1 = new Intern('intern1', 122, 'intern@work', 'University')

//function which writes new index.html file to the directory
// function writeToFile(data) {
//     fs.writeFile("index.html", generateHTML(data), (err) => {
//         err ? console.log(err) : console.log('Success!')
//     }
//     );
// }

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
                message: "Enter team member's id",
                name: "id"
            },
            {
                message: "Enter team member's email address",
                name: "email"
            },
            {
                message: "enter office number",
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
                generateHTML.addHtml(newMember).then(function(){
                if (data.moreMembers == "yes") {
                    addMember();
                } else {
                    generateHTML.finishHtml();
                }
            })
            });

        }).catch(function (err) {
            console.log(err);
        });;
}

function addMember() {
    inquirer.prompt([{
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
                if (response.roleInfo === "Engineer") {
                    newMember = new Engineer(response.name, response.id, response.email, data.roleInfo);
                } else{
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



function startHtml() {
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
        <title>Team Profile</title>
    </head>
    <body>
        <nav class="navbar navbar-dark bg-dark mb-5">
            <span class="navbar-brand mb-0 h1 w-100 text-center">Team Profile</span>
        </nav>
        <div class="container">
            <div class="row">`;
    fs.writeFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        }
    });
    console.log("start");
}

function addHtml(member) {
    return new Promise(function (resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Engineer") {
            const gitHub = member.getGithub();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">GitHub: ${gitHub}</li>
            </ul>
            </div>
        </div>`;
        } else if (role === "Intern") {
            const school = member.getSchool();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
            </ul>
            </div>
        </div>`;
        } else {
            const officePhone = member.getOfficeNumber();
            data = `<div class="col-6">
            <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
            </ul>
            </div>
        </div>`
        }
        console.log("adding team member");
        fs.appendFile("./output/team.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

function finishHtml() {
    const html = ` </div>
    </div>
    
</body>
</html>`;

    fs.appendFile("./output/team.html", html, function (err) {
        if (err) {
            console.log(err);
        };
    });
    console.log("end");
}

//{ name, role, id, email }