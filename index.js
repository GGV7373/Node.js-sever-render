const e = require('express');
const exspress = require('express');

const app = exspress();

const {  Pool } = require('pg');
const fs = require('fs');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'mysecretpassword',
    port: 5432,
});



app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/bilmer-json', async (req, res) => {
    fs.readFile('bilmerker.json', 'utf8', (err, data) => {
        if (err) {
            res.status(500).json({ error: 'Failed to read bilmerker.json' });
            return;
        }
        res.json(JSON.parse(data));
    });
});

app.use(exspress.static('public'));


app.listen(3000, () => {
    console.log('Server is running on http://localhost:' + 3000);
});