Part one:


    Lag et nytt, tomt git-repository på GitHub eller Gitlab, og klon det til din maskin.
    Sett opp prosjektet som vist i denne presentasjonen.
    Sjekk at du klarer å starte serveren og se websiden i nettleseren.
    Add, commit og push endringene til GitHub/Gitlab. node_modules bør ikke legges til i git-repoet, siden det ikke er kode du har skrevet, det er kode som npm kan laste ned ved behov:
        I VSCode, trykk de tre prikkene øverst i commit-vinduet og velg "View -> Tree"
        Høyreklikk på node_modules og velg add to .gitignore. Da vil VSCode opprette en ny fil, .gitignore, der det står hvilke filer som git skal ignorere.
        Filene som faktisk skal være med i git-commit'en er:
            index.js
            package.json
            package-lock.json
            .gitignore
    Legg til en ny rute, /deltagere-1, som viser en html-liste over 3-4 av elevene i klassen. Sjekk at du kan se denne siden i nettleseren.
    Commit og push endringene til GitHub/Gitlab

Part two:


    Sett opp prosjektet som vist i presentasjonen.
    Sjekk at returner en json-fil
    Sjekk at returner en html-fil
    Legg inn noen flere rader i users-tabellen, last deltagere-2 på nytt, og sjekk at de nye radene nå blir vist.

    Legg til en ny tabell bilmerker med kolonnene id og merke.
    Sett inn noen rader med bilmerker.
    Lag en ny rute /bilmerker som henter data fra denne tabellen og returnerer en HTML-liste over bilmerkene.

Lag en ny rute /bilmerker-json som returnerer JSON-data fra tabellen bilmerker.

    Lag en ny mappe public og legg til en ny fil deltagere.html som inneholder en enkel webside.
    Bruk app.use(express.static('public')) for å "serve" denne filen.
    Sjekk at websiden vises når du går til

    Lag to nye tabeller, en for filmer og en for skuespillere. Her er et forslag til SQL:


                        CREATE TABLE filmer (
                            id SERIAL PRIMARY KEY,
                            tittel VARCHAR(100) NOT NULL
                        );

                        CREATE TABLE skuespillere (
                            id SERIAL PRIMARY KEY,
                            navn VARCHAR(100) NOT NULL
                        );
                        

    Legg inn noe data i begge tabellene. Her er et forslag til SQL:


                        INSERT INTO filmer (tittel) VALUES
                            ('The Matrix'),
                            ('The Matrix Reloaded'),
                            ('The Matrix Revolutions');

                        INSERT INTO skuespillere (navn) VALUES
                            ('Keanu Reeves'),
                            ('Laurence Fishburne'),
                            ('Carrie-Anne Moss');
                        

    Lag en tabell, feks skuespiller_i_film som viser hvilke skuespillere som har spilt i hvilke filmer. Bruk fremmednøkler for å referere til skuespiller og til film. Legg inn noe data i denne tabellen.
    Lag en SQL som slår sammen disse to tabellene og returnerer en liste over skuespillere og hvilke filmer de har spilt i
    Lag en ny rute /skuespillere-og-filmer som returnerer denne listen som HTML
    Lag en ny rute /skuespillere-og-filmer-json som returnerer denne listen som JSON
    Lag en webside i public-katalogen, feks skuespillere-og-filmer.html, som henter data fra "/skuespillere-og-filmer-json" og viser det i en liste

Part three:


Sett opp eksempelet som vi har gått gjennom i denne og tidligere presentasjoner:

    Start Postgres vha docker, opprett users-tabellen og sett inn noen rader
    Start opp Express-serveren, og opprett deltagere.html som viser listen over deltagere, i public-katalogen, hvis du ikke allerede har gjort det.
    Start serveren, sjekk at listen over deltagere fungerer
    Legg inn javascriptet og html-koden fra denne presentasjonen i deltagere.html
    Legg til koden for det nye endepunktet i index.js
    Sjekk at du kan legge inn en ny deltager ved å skrive inn navnet og trykke på knappen. Sjekk loggen i terminalen for å se at dataene blir mottatt og lagret i databasen Du må laste siden på nytt for å se om deltageren er lagt til i listen.

    Slik koden er nå må vi laste siden på nytt etter å ha lagt inn en deltager for å sjekke om deltageren ble korrekt lagret i databasen. Det er ikke brukervennlig.

    Endre websiden slik at den henter listen over deltagere på nytt etter å ha lagt inn en ny deltager.

    Hint: Flytt koden som henter deltagere over i en funksjon hentData, legg all koden i samme script-tag, og kall hentData etter kallet til sendData

    Slik koden er nå blir navnet på deltageren værende i input-feltet etter at man har lagt til en deltager. Det er ikke brukervennlig.

    Legg inn kode slik at etter at en ny deltager er lagt til blir input-feltet satt til en blank streng.

    Hint: Du kan sette input-feltet sin value etter kallet til sendData

Lag en tilsvarende side for skuespillere i skuespiller-tabellen vi har opprettet tidligere:

    Opprett tabellen skuespillere og sett inn noen skuespillere, hvis du ikke har den fra før.
    Hvis du ikke har gjort det før: Lag et nytt endepunkt i index.js, feks /skuespillere-json, som henter ut skuespillerne fra databasen og sender dem tilbake i JSON-format.
    Lag en ny html-fil i public-katalogen, skuespillere.html, som viser listen over skuespillere ved å hente den fra endepunktet /skuespillere-json.
    Legg til html-kode for å la brukeren taste inn en ny skuespiller
    Legg til et nytt endepunkt i index.js for å motta dataene og lagre dem i databasen
    Legg til javascript-kode i skuespillere.html for å sende data til servern

Part four:


    Start opp postgres og postgrest som vist, opprett tabell og data for skuespillere som vist, og lag en webside som viser skuespillere og lar deg legge til nye skuespillere som vist.
    Lag en ny tabell for filmer, og legg inn noe data i denne tabellen. Hent ut filmene og vis dem på websiden sammen med skuespillerne.
    Lag en ny form for å sette inn filmer, og legg til funksjonalitet for å legge inn filmer på websiden. Oppdater film-listen etter at en ny film er lagt til.

