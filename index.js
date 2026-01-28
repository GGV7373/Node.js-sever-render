const exspress = require('express');

const app = exspress();

const {  Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});

app.get(
    '/', (req, res) => {
        res.json({ message: 'Hello, World!' });
});

app.get('/deltagere2', async (req, res) => {

    const result = await pool.query('SELECT * FROM users');

    let html = '<h1>List of Users</h1><ul>';
    html += "<ul>"

    for( const row of result.rows ) {
        html += `<li>${row.name}</li>`;
    }
    html += "</ul>";

    res.send(html);
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});