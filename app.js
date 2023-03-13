

var map = L.map('mapa').setView([36.72071131817986, -4.420041081375409], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 14,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


var lista = []
var elementoSeleccionado = 0;



function cargarModal(){
    let elemento = lista[0]
    let nombre = document.getElementById('nombreElemento')
    let direccion = document.getElementById('direccionElemento')
    let horario = document.getElementById('horarioElemento')
    let telefono = document.getElementById('telefonoElemento')
    direccion.classList.add('mb-2')
    horario.classList.add('mb-2')
    telefono.classList.add('mb-2')
    nombre.textContent = elemento.nombre
    direccion.textContent = elemento.direccion
    horario.textContent = elemento.horario
    telefono.textContent = elemento.telefono
}


fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(res => res.json())
    .then(data => {
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

            let elemento = {
                nombre: data[i].properties.nombre,
                horario: data[i].properties.horario,
                direccion: data[i].properties.direccion,
                telefono: data[i].properties.telefono,
            }
            lista.push(elemento)
            
            template.addEventListener('click', 
                cargarModal()
            )

            var marcador = L.marker([data[i].properties.x, data[i].properties.y]).addTo(map);
            marcador.bindPopup(`${data[i].properties.nombre}`);

        }


    })







