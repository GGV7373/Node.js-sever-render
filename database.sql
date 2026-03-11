-- Active: 1772011816664@@localhost@5432@mydb
-- ==================== DATABASESKJEMA FOR NODE.JS SERVERSIDE GJENGIVELSESAPP ====================
-- PostgreSQL databaseskjema med eksempeldata for skuespillere, filmer og deres relasjoner
-- Active: 1772011816664@@localhost@5432@postgres

-- ==================== TABELLER ====================

-- Filmtabell (Filmer)
-- Lagrer informasjon om filmer/kinofilmer
-- Felter:
--   - id: Unik identifikator (Serial/Auto-increment, Primærnøkkel)
--   - tittel: Filmtittel (VARCHAR, max 100 tegn, kan ikke være null)  
CREATE TABLE filmer (
    id SERIAL PRIMARY KEY,
    tittel VARCHAR(100) NOT NULL
);

-- Skuespillertabell (Skuespillere)
-- Lagrer informasjon om skuespillere
-- Felter:
--   - id: Unik identifikator (Serial/Auto-increment, Primærnøkkel)
--   - navn: Skuespillernavn (VARCHAR, max 100 tegn, kan ikke være null)
CREATE TABLE skuespillere (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
);

-- Junksjonstabell: Skuespillere i Filmer (Skuespiller_i_Film)
-- Forbinder skuespillere til filmer i en mange-til-mange forhold
-- En skuespiller kan vises i flere filmer, og en film kan ha flere skuespillere
-- Felter:
--   - id: Unik identifikator (Serial/Auto-increment, Primærnøkkel)
--   - skuespiller_id: Utenlandsk nøkkelreferanse til skuespiller-tabellen
--   - film_id: Utenlandsk nøkkelreferanse til filmer-tabellen
CREATE TABLE skuespiller_i_film (
    id SERIAL PRIMARY KEY,
    skuespiller_id INT NOT NULL,
    film_id INT NOT NULL,
    FOREIGN KEY (skuespiller_id) REFERENCES skuespillere(id),
    FOREIGN KEY (film_id) REFERENCES filmer(id)
);

-- ==================== EKSEMPELDATA ====================

-- Sett inn eksempelfilmer fra The Matrix-trilogien
-- Disse er klassiske sci-fi-filmer med bemerkelsesverdige skuespillere
INSERT INTO filmer (tittel) VALUES
    ('The Matrix'),
    ('The Matrix Reloaded'),
    ('The Matrix Revolutions');

-- Sett inn eksempelskuespillere fra The Matrix-trilogien
-- Disse kjente skuespillerne vises i filmene
INSERT INTO skuespillere (navn) VALUES
    ('Keanu Reeves'),
    ('Laurence Fishburne'),
    ('Carrie-Anne Moss');

-- Forbinde skuespillere med filmer
-- Dette skaper mange-til-mange forholdene
-- Format: (skuespiller_id, film_id)
INSERT INTO skuespiller_i_film (skuespiller_id, film_id) VALUES
    (1, 1),  -- Keanu Reeves i The Matrix
    (1, 2),  -- Keanu Reeves i The Matrix Reloaded
    (1, 3),  -- Keanu Reeves i The Matrix Revolutions
    (2, 1),  -- Laurence Fishburne i The Matrix
    (2, 2),  -- Laurence Fishburne i The Matrix Reloaded
    (2, 3),  -- Laurence Fishburne i The Matrix Revolutions
    (3, 1),  -- Carrie-Anne Moss i The Matrix
    (3, 2),  -- Carrie-Anne Moss i The Matrix Reloaded
    (3, 3);  -- Carrie-Anne Moss i The Matrix Revolutions

-- ==================== DELTAKERE, PERSONER OG BRUKERE TABELLER ====================

-- Deltakertabell (Deltakere)
-- Lagrer informasjon om deltakere
CREATE TABLE deltakere (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
);

-- Persontabell (Personer)
-- Lagrer informasjon om personer
CREATE TABLE personer (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
);

-- Brukertabell (Brukere)
-- Lagrer informasjon om brukere
CREATE TABLE brukere (
    id SERIAL PRIMARY KEY,
    navn VARCHAR(100) NOT NULL
);

INSERT INTO deltakere (navn) VALUES
    ('Roger'),
    ('Alice'),
    ('Bob');

-- ==================== BILMERKER TABELL ====================

-- Bilmerketabell (Bilmerker)
-- Lagrer informasjon om bilmerker
CREATE TABLE bilmerker (
    id SERIAL PRIMARY KEY,
    merke VARCHAR(100) NOT NULL
);

INSERT INTO bilmerker (merke) VALUES
    ('Toyota'),
    ('Honda'),
    ('Ford'),
    ('Tesla'),
    ('BMW');

INSERT INTO brukere (navn) VALUES
    ('Charlie'),
    ('Dave'),
    ('Eve');

INSERT INTO personer (navn) VALUES
    ('Frank'),
    ('Grace'),
    ('Heidi');
    