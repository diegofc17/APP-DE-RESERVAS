function reservar() {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const espacio = document.getElementById("espacio").value;

    fetch('/reservar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, fecha, espacio})
    }).then(response => response.json())
      .then(data => alert(data.mensaje));
}

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita el envío del formulario

    // Captura los datos del formulario
    var nombre = document.getElementById('nombre').value;
    var fecha = document.getElementById('fecha').value;
    var sala = document.getElementById('sala').value;

    // Muestra los datos capturados en la página
    document.getElementById('datosRegistrados').innerText = 
        `Nombre: ${nombre}\nFecha: ${fecha}\nSala: ${sala}`;
});
