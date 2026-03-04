// Importer påkrevde moduler
const express = require('express');
const { Pool } = require('pg');  // PostgreSQL tilkoblingspool
const fs = require('fs');         // Filsystemmodul
require('dotenv').config();       // Last miljøvariabler fra .env-fil

// Initialiser Express-applikasjon
const app = express();

// Konfigurer PostgreSQL-databasetilkoblingskpool
// Legitimasjonene hentes fra miljøvariabler (.env-fil) med fallback-verdier
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'mydb',
    password: process.env.DB_PASSWORD || 'mysecretpassword',
    port: process.env.DB_PORT || 5432,
});

// Middleware for å analysere innkommende JSON-forespørsler
app.use(express.json());

// ==================== DELTAKER (DELTAGERE) ENDEPUNKTER ====================

// HENT: Vis en hardkodet HTML-liste over klassekamerater
app.get('/deltagere-1', (req, res) => {
    res.send(`
        <h1>Deltagere</h1>
        <ul>
            <li>Heath</li>
            <li>Kevin</li>
            <li>Victor</li>
        </ul>
    `);
});

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
    if (!data.navn || !data.navn.trim()) {
        return res.status(400).json({ error: 'Navn er påkrevd' });
    }
    console.log('Mottatt deltakerdata:', data);

    try {
        // Sett inn den nye deltakeren i deltaker-tabellen
        const query = 'INSERT INTO deltakere (navn) VALUES ($1)';
        const values = [data.navn.trim()];
        await pool.query(query, values);
        console.log('Deltaker lagt til vellykket:', data);
        res.json({ message: 'Deltaker lagt til' });
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// POST: Legg til ny person i databasen
app.post('/personer-json', async (req, res) => {
    const data = req.body;
    if (!data.navn || !data.navn.trim()) {
        return res.status(400).json({ error: 'Navn er påkrevd' });
    }
    console.log('Mottatt persondata:', data);

    try {
        // Sett inn den nye personen i personer-tabellen
        const query = 'INSERT INTO personer (navn) VALUES ($1)';
        const values = [data.navn.trim()];
        await pool.query(query, values);
        console.log('Person lagt til vellykket:', data);
        res.json({ message: 'Person lagt til' });
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// POST: Legg til ny bruker i databasen
app.post('/brukere-json', async (req, res) => {
    const data = req.body;
    if (!data.navn || !data.navn.trim()) {
        return res.status(400).json({ error: 'Navn er påkrevd' });
    }
    console.log('Mottatt brukerdata:', data);

    try {
        // Sett inn den nye brukeren i brukere-tabellen
        const query = 'INSERT INTO brukere (navn) VALUES ($1)';
        const values = [data.navn.trim()];
        await pool.query(query, values);
        console.log('Bruker lagt til vellykket:', data);
        res.json({ message: 'Bruker lagt til' });
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

// HENT: Hent alle bilmerker fra databasen som JSON
app.get('/bilmerker-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bilmerker');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// HENT: Hent alle bilmerker fra databasen som HTML
app.get('/bilmerker', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bilmerker');
        let html = '<h1>Bilmerker</h1><ul>';
        result.rows.forEach(row => {
            html += `<li>${row.merke}</li>`;
        });
        html += '</ul>';
        res.send(html);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).send('Databasefeil');
    }
});

// ==================== SKUESPILLERE ENDEPUNKTER ====================

// HENT: Hent alle skuespillere som JSON
app.get('/skuespillere-json', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM skuespillere');
        res.json(result.rows);
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

// POST: Legg til ny skuespiller i databasen
app.post('/skuespillere-json', async (req, res) => {
    const data = req.body;
    if (!data.navn || !data.navn.trim()) {
        return res.status(400).json({ error: 'Navn er påkrevd' });
    }
    console.log('Mottatt skuespillerdata:', data);

    try {
        const query = 'INSERT INTO skuespillere (navn) VALUES ($1)';
        const values = [data.navn.trim()];
        await pool.query(query, values);
        console.log('Skuespiller lagt til vellykket:', data);
        res.json({ message: 'Skuespiller lagt til' });
    } catch (err) {
        console.error('Databasefeil:', err);
        res.status(500).json({ error: 'Databasefeil' });
    }
});

app.get('/klassekamerater-json', async (req, res) => {
    try {
        const data = await fs.promises.readFile('klassekamerater.json', 'utf8');
        res.json(JSON.parse(data));
    } catch (err) {
        console.error('Feil ved lesing av klassekamerater.json:', err);
        res.status(500).json({ error: 'Kunne ikke lese klassekamerater.json' });
    }
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