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
}

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
}