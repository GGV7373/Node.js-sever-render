const exspress = require('express');

const app = exspress();

app.get(
    '/', (req, res) => {
        res.send(`
                    <h1>Hello World</h1>
                    <p>This is a server-side rendered page using Node.js and Express.</p> 
                `)
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});