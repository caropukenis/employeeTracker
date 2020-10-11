USE employee_trackerDB;


INSERT INTO department
    (id, name)
VALUES
    (1, "Engineering");

INSERT INTO department
    (id, name)
VALUES
    (2, "Marketing");

INSERT INTO department
    (id, name)
VALUES
    (3, "Human Resources");

INSERT INTO department
    (id, name)
VALUES
    (4, "IT");


INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (1, "Engineer", 65000, 1);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (2, "Engineer Supervisor", 80000, 1);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (3, "Sales Representative", 55000, 2);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (4, "Sales Manager", 70000, 2);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (5, "Human Resources Coordinator", 48000, 3);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (6, "Human Resources Supervisor", 59000, 3);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (7, "Tech Support", 60000, 4);

INSERT INTO role
    (id, title, salary, department_id)
VALUES
    (8, "IT Supervisor", 75000, 4);


INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Leslie", "Knope", 2, null);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (2, "Ron", "Swanson", 4, null);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (3, "Andy", "Dyer", 6, null);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (4, "April", "Ludgate", 8, null);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (5, "Ann", "Perkins", 1, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (6, "Chris", "Trager", 1, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (7, "Tom", "Haverford", 1, 1);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (8, "Gary", "Gergich", 3, 2);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (9, "Jean-Ralphio", "Saperstein", 3, 2);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (10, "Donna", "Meagle", 3, 2);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (11, "Ben", "Wyatt", 5, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (12, "Shauna", "Malwae-Tweep", 5, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (13, "Ethel", "Beavers", 5, 3);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (14, "Bobby", "Newport", 7, 4);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (15, "Lester", "Kanopf", 7, 4);

INSERT INTO employee
    (id, first_name, last_name, role_id, manager_id)
VALUES
    (16, "Evelyn", "Roushland", 7, 4);