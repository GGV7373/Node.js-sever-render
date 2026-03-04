// Importer påkrevde moduler
const express = require('express');
const { Pool } = require('pg');  // PostgreSQL tilkoblingspool
const fs = require('fs');         // Filsystemmodul

// Initialiser Express-applikasjon
const app = express();

// Konfigurer PostgreSQL-databasetilkoblingskpool
// Merk: I produksjon, flytt disse legitimasjonene til miljøvariabler (.env-fil)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: 'mysecretpassword',
    port: 5432,
});

// Middleware for å analysere innkommende JSON-forespørsler
app.use(express.json());

// ==================== DELTAKER (DELTAGERE) ENDEPUNKTER ====================

// HENT alle deltakere som JSON
app.get('/deltagere-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM deltakere');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// HENT alle personer som JSON
app.get('/personer-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM personer');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// HENT alle brukere som JSON
app.get('/brukere-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM brukere');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// HENT alle deltakere (alias endepunkt)
app.get('/deltagere', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM deltakere');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// ==================== POST ENDEPUNKTER - LEGG TIL DATA TIL DATABASEN ====================

// POST: Legg til ny deltaker i databasen
app.post('/deltagere-json', async (req, res) => {
    const data = req.body;
    console.log('Mottatt deltakerdata:', data);
    
    try {
        // Sett inn den nye deltakeren i deltaker-tabellen
        const query = 'INSERT INTO deltakere (navn) VALUES ($1)';
        const values = [data.navn];
        await pool.query(query, values);
        console.log('Deltaker lagt til vellykket:', data);
        res.send('Deltaker lagt til');
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// POST: Legg til ny person i databasen
app.post('/personer-json', async (req, res) => {
    const data = req.body;
    console.log('Mottatt persondata:', data);
    
    try {
        // Sett inn den nye personen i personer-tabellen
        const query = 'INSERT INTO personer (navn) VALUES ($1)';
        const values = [data.navn];
        await pool.query(query, values);
        console.log('Person lagt til vellykket:', data);
        res.send('Person lagt til');
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// POST: Legg til ny bruker i databasen
app.post('/brukere-json', async (req, res) => {
    const data = req.body;
    console.log('Mottatt brukerdata:', data);
    
    try {
        // Sett inn den nye brukeren i brukere-tabellen
        const query = 'INSERT INTO brukere (navn) VALUES ($1)';
        const values = [data.navn];
        await pool.query(query, values);
        console.log('Bruker lagt til vellykket:', data);
        res.send('Bruker lagt til');
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// ==================== SKUESPILLERE OG FILMER ENDEPUNKTER ====================

// HENT: Hent alle skuespillere og deres filmer som JSON-data
// Bruker en INNER JOIN for å kombinere data fra tre tabeller
app.get('/skuespillere-og-filmer-json', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.id as skuespiller_id, s.navn, f.id as film_id, f.tittel
            FROM skuespillere s
            INNER JOIN skuespiller_i_film sf ON s.id = sf.skuespiller_id
            INNER JOIN filmer f ON sf.film_id = f.id
            ORDER BY s.navn, f.tittel
        `);
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// HENT: Hent skuespillere og filmer med serverside gjengitt HTML
// Genererer formatert HTML med skuespillere gruppert etter navn og deres filmer opplistet
app.get('/skuespillere-og-filmer', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.id as skuespiller_id, s.navn, f.id as film_id, f.tittel
            FROM skuespillere s
            INNER JOIN skuespiller_i_film sf ON s.id = sf.skuespiller_id
            INNER JOIN filmer f ON sf.film_id = f.id
            ORDER BY s.navn, f.tittel
        `);
        
        // Bygg HTML-utgang med grupperte skuespillere
        let html = '<h1>Skuespillere og filmer</h1><ul>';
        let currentActor = '';  // Spor gjeldende skuespiller for å gruppere filmer
        
        result.rows.forEach(row => {
            // Start en ny skuespillerseksjon når skuespiller endres
            if (currentActor !== row.navn) {
                // Lukk forrige skuespillers filmListe
                if (currentActor !== '') {
                    html += '</ul></li>';
                }
                // Start ny skuespillerseksjon
                html += `<li>${row.navn}<ul>`;
                currentActor = row.navn;
            }
            // Legg til film til gjeldende skuespillers liste
            html += `<li>${row.tittel}</li>`;
        });
        
        // Lukk den endelige skuespillers filmListe
        if (currentActor !== '') {
            html += '</ul></li>';
        }
        html += '</ul>';
        
        res.send(html);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).send('Databasefeil');
    }
});

// ==================== BILMERKER ENDEPUNKT ====================

// HENT: Hent alle bilmerker fra bilmerker.json-filen
app.get('/bilmer-json', async (req, res) => {
    fs.readFile('bilmerker.json', 'utf8', (err, data) => {
        if (err) {
            // Returner feil hvis filen ikke kan leses
            res.status(500).json({ error: 'Kunne ikke lese bilmerker.json' });
            return;
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            console.error('JSON-parsefeil i bilmerker.json:', parseErr);
            res.status(500).json({ error: 'Ugyldig JSON i bilmerker.json' });
        }
    });
});

app.get('/klassekamerater-json', async (req, res) => {
    fs.readFile('klassekamerater.json', 'utf8', (err, data) => {
        if (err) {
            // Returner feil hvis filen ikke kan leses
            res.status(500).json({ error: 'Kunne ikke lese klassekamerater.json' });
            return;
        }
        try {
            res.json(JSON.parse(data));
        } catch (parseErr) {
            console.error('JSON-parsefeil i klassekamerater.json:', parseErr);
            res.status(500).json({ error: 'Ugyldig JSON i klassekamerater.json' });
        }
    });
});
// ==================== MIDDLEWARE ====================

// Server alle statiske filer fra 'public' mappen
// Dette inkluderer HTML-filer, CSS, klientside JavaScript og bilder
app.use(express.static('public'));

// ==================== START SERVEREN ====================

// Start Express-serveren på port 3000
app.listen(3000, () => {
    console.log('Server kjører på http://localhost:3000');
});