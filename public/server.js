// ==================== HJELPERFUNKSJONER ====================

/**
 * Henter listen over personer (personer) fra serveren og oppdaterer DOM-en
 * Sletter den eksisterende listen og fyller den med friske data
 */
async function hentPersoner() {
    const response = await fetch('/personer-json');
    const data = await response.json();
    const list = document.getElementById('personer');
    list.innerHTML = '';  // Fjern eksisterende elementer
    
    // Opprett og legg til et listeelement for hver person
    data.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.name;
        list.appendChild(listItem);
    });
}

// ==================== EVENTLYTTERE ====================

/**
 * Eventlytter for "Legg til Person" knappen
 * Sender en POST-forespørsel med personnavnet og oppdaterer listen
 */
document.getElementById('ny-person')
  .addEventListener('click', async () => {
      const inputElement = document.getElementById('person-name');
      const name = inputElement.value;
      const data = { name: name };
      
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

// ==================== INNLEDENDE SIDELASTING ====================

/**
 * Hent og vis personer ved sidelasting
 */
fetch('/personer-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('personer');
        list.innerHTML = '';  // Fjern lastingsmelding
        
        // Opprett listeelement for hver person
        data.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = person.name;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Feil ved henting av personer:', error);
    });

/**
 * Hent og vis deltakere (deltagere) ved sidelasting
 */
fetch('/deltagere-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('deltakere');
        list.innerHTML = '';  // Fjern lastingsmelding
        
        // Opprett listeelement for hver deltaker
        data.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Feil ved henting av deltakere:', error);
    });

/**
 * Hent og vis bilmerker fra bilmerker.json ved sidelasting
 */
fetch('/bilmer-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('bilmerker');
        list.innerHTML = '';  // Fjern lastingsmelding
        
        // Opprett listeelement for hvert bilmerke (make + model)
        data.cars.forEach(bilmerke => {
            const listItem = document.createElement('li');
            listItem.textContent = bilmerke.make + ' ' + bilmerke.model;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Feil ved henting av bilmerker:', error);
    });

// ==================== DELTAKERSTYRING ====================

/**
 * Hjelperfunksjon for å hentet brukernavnet fra inputfeltet
 * @returns {string} Brukernavnet oppgitt i 'navn' inputfeltet
 */
function getUsername() {
    return document.getElementById('name').value;
}

/**
 * Hjelperfunksjon for å hentet skuespillernavnet fra inputfeltet
 * @returns {string} Skuespillernavnet oppgitt i 'skuespiller-navn' inputfeltet
 */
function getSkuespillerName() {
    return document.getElementById('skuespiller-name').value;
}

/**
 * Eventlytter for "Legg til" knappen
 * Utløser tilleggingen av en ny deltaker
 */
document.getElementById('add').addEventListener('click', async () => {
    const userName = getUsername();
    await sendData(userName);
});

/**
 * Sender nye deltakerdata til serveren og oppdaterer deltakerlisten
 * @param {string} userName - Navnet på den nye deltakeren som skal legges til
 */
async function sendData(userName) {
    const data = { name: userName };
    
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
                    listItem.textContent = user.name;
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
