const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./db/connection");
const cTable = require("console.table");
const figlet = require("figlet");

function questions() {
  inquirer
    .prompt({
      name: "menu",
      type: "list",
      message: "Welcome to the Emoloyee Tracker",
      choices: [
        "View all Employees",
        "View all Departments",
        "View all Employees by Manager",
        "View all Roles",
        "Add Employees",
        "Add Role",
        "Delete Role",
        "Add Department",
        "Delete Department",
        "Update Employee Role",
        "Update Employee Manager",
        "View Department Budget",
        "Exit",
      ],
    })
    .then((answer) => {
      switch (answer.menu) {
        case "View All Employees":
          viewAllE();
          break;
        case "View all Departments":
          viewAllD();
          break;
        case "View all Employees by Manager":
          viewAllEByM();
          break;
        case "View all Roles":
          viewAllRoles();
          break;
        case "Add Employee":
          addE();
          break;
        case "Remove Employee":
          removeE();
          break;
        case "Add Role":
          addRole();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Add Department":
          addD();
          break;
        case "Delete Department":
          deleteD();
          break;
        case "Update Employee Role":
          updateErole();
          break;
        case "Update Employee Role":
          updateEM();
          break;
        case "View Department Budget":
          viewDbudger();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function viewAllE() {
  const query =
    "SELECT e.id, e.first_name, e.last_name, role.title, role.salary FROM employee, role WHERE role.id = e.role_id";

  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function viewAllD() {
  const query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    questions();
  });
}

function viewAllEByM() {
  const mArray = [];
  let query =
    "SELECT e.id, e.first_name, e.last_name, e.m_id FROM e Where m_is is NULL";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (let i = 0; i < res.length; i++) {
      let mString =
        res[i].id + " " + res[i].first_name + " " + res[i].last_name;
      mArray.push(mString);
    }

    inquirer
      .prompt({
        name: "mList",
        type: "list",
        message: "Please select a manager to view their employees.",
        choices: mArray,
      })
      .then((answer) => {
        const eList = {};
        eList.mID = parseInt(answer.mList.split(" ")[0]);

        let query = "SELECT * FROM employee WHERE ?";

        connection.query(query, { m_id: eList.mIdD }, function (err, res) {
          if (err) throw err;
          console.table(res);
          questions();
        });
      });
  });
}

function viewAllRoles() {
  let query = "SELECT * FROM role";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

function addE() {
  const roleArray = [];
  const eArray = [];

  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let roleString = res[i].id + " " + res[i].title;
      roleArray.push(roleStr);
    }

    connection.query("SELECT * FROM employee", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let eString =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        eArray.push(eString);
      }

      inquirer
        .prompt([
          {
            name: "newFirstName",
            type: "input",
            message: "What's the new employee's first name?",
          },
          {
            name: "newLastName",
            type: "input",
            message: "What's the new employee's last name?",
          },
          {
            name: "newRoleID",
            type: "list",
            message: "What's the new employee's role?",
            choices: roleArray,
          },
          {
            name: "newMID",
            type: "list",
            message: "Who is the new employee's supervisor?",
            choices: eArray,
          },
        ])
        .then((answer) => {
          const newE = {};
          newE.roleID = parseInt(answer.newRoleID.split(" ")[0]);
          newE.mID = parseInt(answer.newMID.split(" ")[0]);

          connection.query(
            "INSERT INTO employee (first_name, last_name, role_id, m_id) VALUES (?, ?, ?, ?)",
            [answer.newFirstName, answer.newLastName, newE.roleID, newE.mID]
          ),
            function (err, res) {
              if (err) throw err;
              console.table(res);
            };
          console.log("The employee has been added!");
          questions();
        });
    });
  });
}

function removeE() {
  let eArray = [];

  connection.query("SELECT * FROM employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let eString =
        res[i].id + " " + res[i].first_name + " " + res[i].last_name;
      eArray.push(eString);
    }
    inquirer
      .prompt({
        name: "removeEmployee",
        type: "list",
        message: "Please select the employee you would like to remove",
        choices: eArray,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeE.split(" ")[0]);

        let query = "DELETE FROM employee WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Employee has been removed.");
        questions();
      });
  });
}

function addRole() {
  const dArray = [];

  connection.query("SELECT * FROM department", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let dString = res[i].id + " " + res[i].name;
      dArray.push(dString);
    }

    inquirer
      .prompt([
        {
          name: "newRole",
          type: "input",
          message: "What is the title of the role you would like to add?",
        },
        {
          name: "newRoleSalary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "departmentID",
          type: "list",
          message: "Which department is the new role part of?",
          choices: dArray,
        },
      ])
      .then(function (answer) {
        const newRole = {};
        newRole.departmentID = parseInt(answer.dID.split(" ")[0]);

        connection.query(
          "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
          [answer.newRole, answer.newRoleSalary, newRole.dID]
        ),
          function (err, res) {
            if (err) throw err;
          };
        console.log("Role has been added!");
        questions();
      });
  });
}

function deleteRole() {
  let roleArray = [];

  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let roleString = res[i].id + " " + res[i].title;
      roleArray.push(roleString);
    }
    inquirer
      .prompt({
        name: "removeRole",
        type: "list",
        message: "Please select the role you would like to remove",
        choices: roleArray,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeRole.split(" ")[0]);

        let query = "DELETE FROM role WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Role has been removed.");
        questions();
      });
  });
}

function addD() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the title of the department you would like to add?",
      name: "newDepartment",
    })
    .then((answer) => {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.newDepartment],
        function (err, res) {
          if (err) throw err;
        }
      );
      console.log("Department added successfully!");
      questions();
    });
}

function deleteD() {
  let dArray = [];

  connection.query("SELECT * FROM department", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let dString = res[i].id + " " + res[i].name;
      dArray.push(dString);
    }
    inquirer
      .prompt({
        name: "removeDepartment",
        type: "list",
        message: "Please select the department you would like to remove",
        choices: dArray,
      })
      .then((answer) => {
        const removeID = parseInt(answer.removeD.split(" ")[0]);

        let query = "DELETE FROM department WHERE ?";

        connection.query(query, { id: removeID }, function (err, res) {
          if (err) throw err;
        });
        console.log("Department has been removed.");
        questions();
      });
  });
}

function updateErole() {
  let roleArray = [];
  connection.query("SELECT * FROM role", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let roleString = res[i].id + " " + res[i].title;
      roleArray.push(roleString);
    }

    let eArray = [];
    connection.query("SELECT * FROM employee", function (err, res) {
      for (let i = 0; i < res.length; i++) {
        let eString =
          res[i].id + " " + res[i].first_name + " " + res[i].last_name;
        eArray.push(eString);
      }

      inquirer
        .prompt([
          {
            name: "updateRole",
            type: "list",
            message: "Select the employee whose role you would like to update.",
            choices: eArray,
          },
          {
            name: "newRole",
            type: "list",
            message: "Please select the employee's new role.",
            choices: roleArray,
          },
        ])
        .then((answer) => {
          const updateID = {};
          updateID.eID = parseInt(answer.updateRole.split(" ")[0]);
          updateID.newID = parseInt(answer.newRole.split(" ")[0]);

          connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
            updateID.newID,
            updateID.eID,
          ]);
          console.log("Role successfully updated!");
          questions();
        });
    });
  });
}

function updateEM() {
  let eArray = [];
  let mArray = [];

  connection.query("SELECT * FROM employee", function (err, res) {
    for (let i = 0; i < res.length; i++) {
      let eString =
        res[i].id + " " + res[i].first_name + " " + res[i].last_name;
      eArray.push(eString);
      mArray.push(eString);
    }
    inquirer
      .prompt([
        {
          name: "employee",
          type: "list",
          message: "Which employee needs a new manager?",
          choices: eArray,
        },
        {
          name: "manager",
          type: "list",
          message: "Who is the new manager for this employee?",
          choices: mArray,
        },
      ])
      .then((answer) => {
        const updateM = {};
        updateM.eID = parseInt(answer.e.split(" ")[0]);
        updateM.mID = parseInt(answer.m.split(" ")[0]);
        let query = "UPDATE employee SET m_id = ? WHERE id = ?";

        connection.query(query, [updateM.mID, updateM.eID], function (
          err,
          res
        ) {
          if (err) throw err;
        });
        console.log("Employee manager has been updated.");
        questions();
      });
  });
}

function viewDBudget() {
  let query =
    "SELECT department.id AS id, department.name AS departments, SUM(salary) AS budget FROM role LEFT JOIN department ON role.department_id = department.id GROUP BY role.department_id";

  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    questions();
  });
}

figlet("Employee Tracker", function (err, data) {
  if (err) {
    console.log("Something went wrong...");
    console.dir(err);
    return;
  }
  console.log(data);
});

setTimeout(function () {
  questions();
}, 3000);
