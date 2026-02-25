// Fetch skuespillere list on page load
fetch('/skuespillere-json')
    .then(response => response.json())
    .then(data => {
        const list = document.getElementById('skuespillere');
        list.innerHTML = '';
        data.forEach(skuespiller => {
            const listItem = document.createElement('li');
            listItem.textContent = skuespiller.name;
            list.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching skuespillere:', error);
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

async function sendSkuespillerData(skuespillerName) {
    const data = { name: skuespillerName };
    const response = await fetch('/skuespillere-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (response.ok) {
        // Refresh the skuespillere list after adding
        fetch('/skuespillere-json')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('skuespillere');
                list.innerHTML = '';
                data.forEach(skuespiller => {
                    const listItem = document.createElement('li');
                    listItem.textContent = skuespiller.name;
                    list.appendChild(listItem);
                });
            });
        document.getElementById('skuespiller-name').value = '';
    } else {
        alert('Failed to add skuespiller');
    }
}

// Add event listener for 'Add Skuespiller' button
document.getElementById('add-skuespiller').addEventListener('click', async () => {
    const skuespillerName = document.getElementById('skuespiller-name').value;
    await sendSkuespillerData(skuespillerName);
});