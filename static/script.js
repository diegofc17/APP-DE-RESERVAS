function reservar() {
    const nombre = document.getElementById("nombre").value;
    const fecha = document.getElementById("fecha").value;
    const espacios = document.getElementById("espacios").value;

    fetch('http://localhost:5000/reservar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({nombre, fecha, espacios})
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        if (data.mensaje) {
            alert(data.mensaje);
        } else if (data.error) {
            alert("Error: " + data.error);
        }
    }).catch(error => {
        console.error('Error:', error);
        alert("Error al realizar la reserva: " + error.message);
    });
}

function consultar() {
    fetch('http://localhost:5000/consultar', {
        method: 'GET',
        headers: {'Content-Type': 'application/json'}
    }).then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.statusText);
        }
        return response.json();
    }).then(data => {
        const datosRegistrados = document.getElementById('datosRegistrados');
        if (Array.isArray(data)) {
            datosRegistrados.innerHTML = data.map(reserva => 
                `Nombre: ${reserva[1]}, Fecha: ${reserva[2]}, Espacio: ${reserva[3]}<br>`
            ).join('');
        } else if (data.error) {
            datosRegistrados.innerHTML = "Error: " + data.error;
        }
    }).catch(error => {
        console.error('Error:', error);
        alert("Error al consultar las reservas: " + error.message);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('registroForm').addEventListener('submit', function(event) {
        event.preventDefault();  // Evita el envío del formulario
        reservar();  // Llama a la función reservar
    });
});
