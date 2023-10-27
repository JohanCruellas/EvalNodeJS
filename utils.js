import { students } from './data/data.js';

function generateStudentsPage() {
    let html = `
    <nav>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/students">Students</a></li>
        </ul>
    </nav>
    <ul>`;
    for (let [studentIndex, student] of students.entries()) {
        html += `
        <form action="/deleteStudent?index=${studentIndex}" method="POST">
            <li>${student.name} - ${student.birth}
                <button type="submit" value="Submit">Delete</button>
            </li>
        </form> `;
    }
    html += '</ul>';
    return html;
}

function addStudent(name, dob) {
    students.push({ name, birth: dob });
}

function deleteStudent(index) {
    students.splice(index, 1);
}

export { generateStudentsPage, addStudent, deleteStudent }