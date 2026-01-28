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