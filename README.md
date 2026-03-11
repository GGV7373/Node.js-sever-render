# Node.js Serverside Gjengivelse Applikasjon

En moderne Express.js webapplikasjon som demonstrerer serverside gjengivelse med en PostgreSQL-databasebakgrunn. Denne applikasjonen viser dynamisk datahenting, skjemahåndtering og interaktive brukergrensesnitt.

## Innholdsfortegnelse
- [Funksjonalitet](#funksjonalitet)
- [Prosjektstruktur](#prosjektstruktur)
- [Databaseskjema](#databaseskjema)
- [Kom i Gang](#kom-i-gang)
- [API-Endepunkter](#api-endepunkter)
- [Sider](#sider)
- [Teknologier](#teknologier)

## Funksjonalitet

- **Serverside Gjengivelse**: Dynamisk HTML-generering fra databasespørringer
- **RESTful API**: JSON-endepunkter for datahenting og manipulering
- **PostgreSQL Integrasjon**: Persistent datalagring med relasjonsdatabase
- **Responsiv UI**: Moderne stilisering med CSS-animasjoner og layouts
- **Databehandling**: Legg til og hent deltakere, personer, skuespillere og filmer
- **JSON Data Støtte**: Integrasjon med JSON-filer for ekstra datakilder

## Prosjektstruktur

```
Node.js-sever-render/
├── index.js                    # Hovedserver og API-endepunkter
├── database.sql                # Databaseskjema og eksempeldata
├── bilmerker.json              # Bilmerkedata
├── package.json                # Node.js avhengigheter
├── public/
│   ├── index.html              # Startsiden
│   ├── deltagere.html          # Deltakerstyring side
│   ├── skuespillere-og-filmer.html  # Skuespillere og filmer side
│   ├── server.js               # Klientside JavaScript
│   └── styles.css              # Applikasjonsstyleark
└── README.md                   # Denne filen
```

## Databaseskjema

Applikasjonen bruker PostgreSQL med følgende tabeller:

### Brukertabell
- Lagrer deltakerinformasjon

### Personers Tabell (Norsk for "Persons")
- Lagrer personoppføringer

### Filmer Tabell (Norsk for "Movies")
- Lagrer filmtitler
- Felter: `id` (Primærnøkkel), `tittel` (Tittel)

### Skuespillere Tabell (Norsk for "Actors")
- Lagrer skuespillernavn
- Felter: `id` (Primærnøkkel), `navn` (Navn)

### Skuespiller_i_Film Tabell (Junksjonstabell)
- Forbinder skuespillere til filmer (Mange-til-Mange forhold)
- Felter: `id`, `skuespiller_id` (Utenlandsk nøkkel), `film_id` (Utenlandsk nøkkel)

## Kom i Gang

### Forutsetninger
- Node.js (v14 eller høyere)
- PostgreSQL database
- npm eller yarn

### Installasjon

1. Klon depotet:
```bash
git clone https://github.com/GGV7373/Node.js-sever-render.git
cd Node.js-sever-render
```

2. Installer avhengigheter:
```bash
npm install
```

3. Sett opp PostgreSQL-databasen:
```bash
psql -U postgres < database.sql
```

4. Start serveren:
```bash
npm run server    # Start med Node.js
npm run dev       # Start med Nodemon (auto-oppdatering ved endringer)
```

5. Åpne nettleseren og naviger til:
```
http://localhost:3000
```

## API-Endepunkter

### Deltakere (Deltagere)
- `GET /deltagere-json` - Hent alle deltakere
- `POST /deltagere-json` - Legg til ny deltaker
- `GET /deltagere` - Samme som over (alias)

### Personer (Personer)
- `GET /personer-json` - Hent alle personer
- `POST /personer-json` - Legg til ny person

### Skuespillere og Filmer
- `GET /skuespillere-og-filmer-json` - Hent alle skuespillere og deres filmer (JSON)
- `GET /skuespillere-og-filmer` - Hent skuespillere og filmer med gjengitt HTML

### Bilmerker (Bilmerker)
- `GET /bilmer-json` - Hent alle bilmerker fra bilmerker.json

### Statiske Filer
- Alle filer i `public/` mappen serveres som statiske filer

##  Sider

### Startsiden (`/`)
- Velkomstsiden med navigasjon til andre seksjoner
- Viser bilmerkedata fra bilmerker.json

### Deltaker Side (`/deltagere.html`)
- Vis liste over alle deltakere
- Legg til nye deltakere gjennom et skjema
- Vis liste over personer
- Legg til nye personer gjennom et skjema

### Skuespillere og Filmer Side (`/skuespillere-og-filmer.html`)
- Viser skuespillere gruppert etter navn
- Viser alle filmer for hver skuespiller
- Stylet med moderne kortlayouter

## Teknologier

- **Backend**: Express.js 5.2.1
- **Database**: PostgreSQL
- **Databaseklient**: pg (node-postgres) 8.17.2
- **Utvikling**: Nodemon 3.1.11
- **Frontend**: Vanilla JavaScript, HTML5, CSS3

## Merknader

- Applikasjonen bruker norske språketiketter for noen funksjoner (skuespillere, filmer)
- Databaselegitimasjon i `index.js` bør flyttes til miljøvariabler i produksjon
- Applikasjonen kjører på port 3000 som standard
- All data er vedvarende i PostgreSQL-databasen

## Lisens

MIT License copyright (c) 2026 GGV7373

## Contributor

GGV7373