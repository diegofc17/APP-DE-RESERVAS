from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os

app = Flask(__name__)
CORS(app)  # Habilitar CORS para todas las rutas

# Obtener la ruta absoluta del directorio actual
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'reservas.db')

# Crear la base de datos y la tabla si no existen
def init_db():
    if not os.path.exists(DB_PATH):
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute('''CREATE TABLE IF NOT EXISTS reservas
                     (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, fecha TEXT, espacio TEXT)''')
        conn.commit()
        conn.close()
        print(f"Base de datos creada exitosamente en {DB_PATH}.")
    else:
        print(f"La base de datos ya existe en {DB_PATH}.")

@app.route('/reservar', methods=['POST'])
def reservar():
    data = request.json
    nombre = data['nombre']
    fecha = data['fecha']
    espacio = data['espacios']

    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("INSERT INTO reservas (nombre, fecha, espacio) VALUES (?, ?, ?)", (nombre, fecha, espacio))
        conn.commit()
        conn.close()
        return jsonify({"mensaje": "Reserva realizada con éxito"})
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

@app.route('/consultar', methods=['GET'])
def consultar():
    try:
        conn = sqlite3.connect(DB_PATH)
        c = conn.cursor()
        c.execute("SELECT * FROM reservas")
        reservas = c.fetchall()
        conn.close()
        return jsonify(reservas)
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    init_db()
    app.run(debug=True)
