import { students } from './data/data.js';
import dayjs from 'dayjs';

function generateStudentsPage() {
    let html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Students Page</title>
    <link rel="stylesheet" type="text/css" href="/style.css">
</head>
<body>
<div class="card">

    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li class="activeTab"><a href="/students">Students</a></li>
        </ul>
    </nav>
    <ul class="addForm">`;
    for (let [studentIndex, student] of students.entries()) {
        html += `
        <form action="/deleteStudent?index=${studentIndex}" method="POST">
            <li class="studentItem">${student.name} - ${dayjs(student.birth).format('DD/MM/YYYY')}
                <button type="submit" value="Submit" class="btn">X</button>
            </li>
        </form> `;
    }
    html += `
                </ul>
                </div>
            </body>
        </html>`;
    return html;
}


function addStudent(name, dob) {
    students.push({ name, birth: dob });
}

function deleteStudent(index) {
    students.splice(index, 1);
}

export { generateStudentsPage, addStudent, deleteStudent }