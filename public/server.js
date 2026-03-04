// ==================== HJELPERFUNKSJONER ====================

/**
 * Henter listen over personer (personer) fra serveren og oppdaterer DOM-en
 * Sletter den eksisterende listen og fyller den med friske data
 */
async function hentPersoner() {
    const response = await fetch('/personer-json');
    const data = await response.json();
    const list = document.getElementById('personer');
    if (!list) return;
    list.innerHTML = '';  // Fjern eksisterende elementer

    // Opprett og legg til et listeelement for hver person
    data.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.navn;
        list.appendChild(listItem);
    });
}

// ==================== EVENTLYTTERE ====================

/**
 * Eventlytter for "Legg til Person" knappen
 * Sender en POST-forespørsel med personnavnet og oppdaterer listen
 */
const nyPersonBtn = document.getElementById('ny-person');
if (nyPersonBtn) {
    nyPersonBtn.addEventListener('click', async () => {
        const inputElement = document.getElementById('person-name');
        const name = inputElement.value;
        const data = { navn: name };

        // Send POST-forespørsel for å legge til ny person
        await fetch('/personer-json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Tøm inputfeltet og oppdater listen
        inputElement.value = '';
        await hentPersoner();
    });
}

// ==================== INNLEDENDE SIDELASTING ====================

/**
 * Hent og vis personer ved sidelasting
 */
const personerList = document.getElementById('personer');
if (personerList) {
    fetch('/personer-json')
        .then(response => response.json())
        .then(data => {
            personerList.innerHTML = '';  // Fjern lastingsmelding

            // Opprett listeelement for hver person
            data.forEach(person => {
                const listItem = document.createElement('li');
                listItem.textContent = person.navn;
                personerList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av personer:', error);
        });
}

/**
 * Hent og vis deltakere (deltagere) ved sidelasting
 */
const deltakereList = document.getElementById('deltakere');
if (deltakereList) {
    fetch('/deltagere-json')
        .then(response => response.json())
        .then(data => {
            deltakereList.innerHTML = '';  // Fjern lastingsmelding

            // Opprett listeelement for hver deltaker
            data.forEach(user => {
                const listItem = document.createElement('li');
                listItem.textContent = user.navn;
                deltakereList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av deltakere:', error);
        });
}

/**
 * Hent og vis brukere ved sidelasting
 */
const brukerList = document.getElementById('brukere');
if (brukerList) {
    fetch('/brukere-json')
        .then(response => response.json())
        .then(data => {
            brukerList.innerHTML = '';  // Fjern lastingsmelding

            // Opprett listeelement for hver bruker
            data.forEach(bruker => {
                const listItem = document.createElement('li');
                listItem.textContent = bruker.navn;
                brukerList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av brukere:', error);
        });
}

/**
 * Hent og vis bilmerker fra bilmerker.json ved sidelasting
 */
const bilmerkerList = document.getElementById('bilmerker');
if (bilmerkerList) {
    fetch('/bilmer-json')
        .then(response => response.json())
        .then(data => {
            bilmerkerList.innerHTML = '';  // Fjern lastingsmelding

            // Opprett listeelement for hvert bilmerke (make + model)
            data.cars.forEach(bilmerke => {
                const listItem = document.createElement('li');
                listItem.textContent = bilmerke.make + ' ' + bilmerke.model;
                bilmerkerList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av bilmerker:', error);
        });
}

const klassekameraterList = document.getElementById('klassekamerater');
if (klassekameraterList) {
    fetch('/klassekamerater-json')
        .then(response => response.json())
        .then(data => {
            klassekameraterList.innerHTML = '';  // Fjern lastingsmelding

            // Opprett listeelement for hver klassekamerat
            data.klasse.forEach(klassekamerat => {
                const listItem = document.createElement('li');
                listItem.textContent = klassekamerat.navn;
                klassekameraterList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Feil ved henting av klassekamerater:', error);
        });
}


// ==================== DELTAKERSTYRING ====================

/**
 * Hjelperfunksjon for å hentet brukernavnet fra inputfeltet
 * @returns {string} Brukernavnet oppgitt i 'navn' inputfeltet
 */
function getUsername() {
    return document.getElementById('name').value;
}

/**
 * Eventlytter for "Legg til" knappen
 * Utløser tilleggingen av en ny deltaker
 */
const addBtn = document.getElementById('add');
if (addBtn) {
    addBtn.addEventListener('click', async () => {
        const userName = getUsername();
        await sendData(userName);
    });
}

/**
 * Sender nye deltakerdata til serveren og oppdaterer deltakerlisten
 * @param {string} userName - Navnet på den nye deltakeren som skal legges til
 */
async function sendData(userName) {
    const data = { navn: userName };

    // Send POST-forespørsel for å legge til ny deltaker
    const response = await fetch('/deltagere-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        // Oppdater deltakerlisten etter vellykket tillegging
        fetch('/deltagere-json')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('deltakere');
                list.innerHTML = '';  // Tøm eksisterende liste

                // Fyller liste med oppdatert deltakerdata
                data.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = user.navn;
                    list.appendChild(listItem);
                });
            });
        // Tøm inputfeltet etter vellykket innsending
        document.getElementById('name').value = '';
    } else {
        // Vis feilmelding hvis innsending mislykkes
        alert('Feil ved tillegging av deltaker');
    }
}

// ==================== SKUESPILLERE OG FILMER ====================

/**
 * Hent skuespillere og filmdata fra API-endepunktet
 * Grupperer dataene etter skuespillernavn og gjengivelser formatert HTML
 */
if (document.getElementById('content')) {
    fetch('/skuespillere-og-filmer-json')
        .then(response => response.json())
        .then(data => {
            // Grupperer data etter skuespillernavn
            const actorMap = {};

            // Bygger et kart over skuespillere til deres filmer
            data.forEach(row => {
                // Opprett en ny skuespiller-oppføring hvis den ikke finnes
                if (!actorMap[row.navn]) {
                    actorMap[row.navn] = [];
                }
                // Legg til film i denne skuespillerens liste
                actorMap[row.navn].push(row.tittel);
            });

            // Opprett HTML-utgang fra de grupperte dataene
            let html = '';

            // Gjennomgår skuespillere i alfabetisk rekkefølge
            Object.keys(actorMap).sort().forEach(actorName => {
                // Opprett skuespillerkort
                html += `<div class="actor">
                    <div class="actor-name">${actorName}</div>
                    <ul class="movies">`;

                // Legg til alle filmer for denne skuespilleren i alfabetisk rekkefølge
                actorMap[actorName].sort().forEach(movieTitle => {
                    html += `<li>${movieTitle}</li>`;
                });

                // Lukk skuespillerkort
                html += `</ul>
                </div>`;
            });

            // Sett inn den genererte HTML-en på siden
            document.getElementById('content').innerHTML = html;
        })
        .catch(error => {
            // Håndter eventuelle feil som oppstår under henting
            console.error('Feil ved lasting av data:', error);
            document.getElementById('content').innerHTML = '<p class="error-text">Feil ved lasting av data</p>';
        });
}
