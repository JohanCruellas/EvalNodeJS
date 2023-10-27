import 'dotenv/config';
import { createServer } from 'node:http'
import { readFileSync, writeFileSync } from 'node:fs';

const students = [
    { name : "Sonia", birth : "2019-14-05"},
    { name : "Antoine", birth : "2000-12-05"},
    { name : "Alice", birth : "1990-14-09"},
    { name : "Sophie", birth : "2001-10-02"},
    { name : "Bernard", birth : "1980-21-08"}
];

const server = createServer((request, response) => {
    response.setHeader('Content-Type', 'text/html');
    if (request.url === '/') {
        response.end(readFileSync('./view/home.html'));
    }

    else {
        response.end(readFileSync('./view/404.html'))
    }
});

server.listen(process.env.APP_PORT, () => {
    console.log(process.env)
    console.log(`Server started on port ${process.env.APP_PORT}`);
});

