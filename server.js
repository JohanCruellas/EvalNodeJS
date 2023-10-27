import 'dotenv/config';
import { students } from './data/data.js';
import { addStudent, deleteStudent, generateStudentsPage } from './utils.js';
import { createServer } from 'node:http'
import { readFileSync } from 'node:fs';
import * as url from 'node:url';

const server = createServer((request, response) => {

    response.setHeader('Content-Type', 'text/html');

    if (request.url === '/style.css') {
        const cssPath = './assets/css/style.css';
        response.setHeader('Content-Type', 'text/css');
        response.end(readFileSync(cssPath));
    } else {

        if (request.url === '/') {
            response.end(readFileSync('./view/home.html'));
        }

        else if (request.url === '/addStudent' && request.method === 'POST') {
            const body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            });
            request.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                let args = parsedBody.split('&');

                let name = args[0].split('=')[1];
                let dob = args[1].split('=')[1];

                if (name === '' || dob === '' || isNaN(Date.parse(dob))) {
                    response.statusCode = 400;
                    console.error('Invalid name or date of birth');
                    return response.end(readFileSync('./view/home.html'));
                } else {
                    addStudent(name, dob);
                    response.statusCode = 302;
                    response.setHeader('Location', '/');
                    return response.end();
                }
            });
        }

        else if (url.parse(request.url).pathname === '/deleteStudent' && request.method === 'POST') {

            const index = url.parse(request.url, true).query.index;

            if (isNaN(index) || index < 0 || index >= students.length) {
                response.statusCode = 400;
                console.error('Invalid index');
                return response.end(readFileSync('./view/home.html'));
            } else {

                deleteStudent(index);

                response.statusCode = 302;
                response.setHeader('Location', '/students');
                return response.end();
            }
        }

        else if (request.url === '/students') {
            response.end(generateStudentsPage());
        }

        else {
            response.end(readFileSync('./view/404.html'))
        }
    }
});

server.listen(process.env.APP_PORT, () => {
    console.log(`Server started on port ${process.env.APP_PORT}`);
});

