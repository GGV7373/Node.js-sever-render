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
app.use(exspress.json());

app.get('/deltagere-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

app.get('/personer-json', async (req, res) => {
    const result = await pool.query('SELECT * FROM personer');
    res.json(result.rows);
});

app.get('/deltagere', async (req, res) => {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
});

// add to database (POST)
// Add new user (POST)
app.post('/deltagere-json', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    const query = 'INSERT INTO users (name) VALUES ($1)';
    const values = [data.name];
    await pool.query(query, values);
    console.log('User added ', data);
    res.send('User added');

});

// Add new person (POST)
app.post('/personer-json', async (req, res) => {
    const data = req.body;
    console.log('Received data:', data);
    const query = 'INSERT INTO personer (name) VALUES ($1)';
    const values = [data.name];
    await pool.query(query, values);
    console.log('Person added ', data);
    res.send('Person added');
});

// Remove unused postgrest proxy for skuespillere


// statike filer
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