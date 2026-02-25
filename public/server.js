// Function to fetch and update personer list
async function hentPersoner() {
    const response = await fetch('/personer-json');
    const data = await response.json();
    const list = document.getElementById('personer');
    list.innerHTML = '';
    data.forEach(person => {
        const listItem = document.createElement('li');
        listItem.textContent = person.name;
        list.appendChild(listItem);
    });
}

// Add event listener for 'ny-person' button
document.getElementById('ny-person')
  .addEventListener('click', async () => {
      const inputElement = document.getElementById('person-name');
      const name = inputElement.value;
      const data = { name: name };
      await fetch('/personer-json', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });
      inputElement.value = '';
      await hentPersoner();
});
// Fetch personer list on page load
fetch('/personer-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('personer');
        list.innerHTML = '';
        data.forEach(person => {
            const listItem = document.createElement('li');
            listItem.textContent = person.name;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching personer:', error);
    });
fetch('/deltagere-json')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('deltakere');
                list.innerHTML = '';
                data.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = user.name;
                    list.appendChild(listItem);
                });
            })
            .catch(error => {
                console.error('Error fetching users:', error);
});

fetch('/bilmer-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('bilmerker');
        list.innerHTML = '';
        data.cars.forEach(bilmerke => {
            const listItem = document.createElement('li');
            listItem.textContent = bilmerke.make + ' ' + bilmerke.model;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching bilmerker:', error);
});

function getUsername() {
    return document.getElementById('name').value;
};

function getSkuespillerName() {
    return document.getElementById('skuespiller-name').value;
};

document.getElementById('add').addEventListener('click', async () => {
    const userName = getUsername();
    await sendData(userName);
});

async function sendData(userName) {
    const data = { name: userName };
    const response = await fetch('/deltagere-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        // Refresh the list after adding
        fetch('/deltagere-json')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('deltakere');
                list.innerHTML = '';
                data.forEach(user => {
                    const listItem = document.createElement('li');
                    listItem.textContent = user.name;
                    list.appendChild(listItem);
                });
            });
        document.getElementById('name').value = '';
    } else {
        alert('Failed to add user');
    }
};

// Remove old skuespiller function

// Remove old add-skuespiller event


// Remove unused hentpersoner function
// ...existing code...