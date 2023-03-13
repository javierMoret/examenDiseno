

var map = L.map('mapa').setView([36.72071131817986, -4.420041081375409], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        console.log(data[24].properties.nombre);
        const tbody = document.querySelector("#listaElementos");
        const template = document.querySelector('#elementoLista');
        for (let i = 0; i < data.length; i++) {
            // Clone the new row and insert it into the table
            const clone = template.content.cloneNode(true);
            let nombre = clone.getElementById('nombre')
            let horario = clone.getElementById('horario')
            let direccion = clone.getElementById('direccion')
            let telefono = clone.getElementById('telefono')
            nombre.textContent = data[i].properties.nombre;
            horario.textContent = data[i].properties.horario;
            direccion.textContent = data[i].properties.direccion;
            telefono.textContent = data[i].properties.telefono;
            if (telefono.textContent != "") {
                telefono.classList.add('tarjeta')
            }
            tbody.appendChild(clone);

            var marcador = L.marker([data[i].properties.x, data[i].properties.y]).addTo(map);
            marcador.bindPopup(`${data[i].properties.nombre}`);
        }


    })



