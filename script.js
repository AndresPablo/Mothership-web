let gameData = {};

async function loadGameData() {
    const response = await fetch('data.json');
    gameData = await response.json();
    console.log("Datos cargados:", gameData);
}

// Llama esta función al cargar la página
loadGameData();


function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Genera clases
function generateClass() {
    const classes = ["Marine", "Android", "Scientist", "Teamster"];
    const selectedClass = classes[getRandomNumber(0, classes.length - 1)];
    document.getElementById("class-display").innerText = selectedClass;
}

// Genera estadísticas
function generateStats() {
    const stats = {
        Strength: getRandomNumber(27, 45),
        Speed: getRandomNumber(27, 45),
        Intellect: getRandomNumber(27, 45),
        Combat: getRandomNumber(27, 45)
    };
    document.getElementById("stats-display").innerText = JSON.stringify(stats);
}

// Genera salvaciones
function generateSaves() {
    const saves = {
        Sanity: getRandomNumber(12, 30),
        Fear: getRandomNumber(12, 30),
        Body: getRandomNumber(12, 30)
    };
    document.getElementById("saves-display").innerText = JSON.stringify(saves);
}

// Genera equipo
function generateEquipment() {
    const equipment = ["Vaccsuit", "Laser Cutter", "Patch Kit", "Crowbar"];
    const selectedEquipment = equipment[getRandomNumber(0, equipment.length - 1)];
    document.getElementById("equipment-display").innerText = selectedEquipment;
}

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateLoadout(className) {
    const loadout = gameData.loadouts.find(l => l.class === className);
    if (!loadout) {
        console.error(`No se encontró un loadout para la clase: ${className}`);
        return;
    }

    const items = loadout.items.map(itemName => {
        const item = gameData.weapons.find(w => w.name === itemName) ||
                     gameData.items.find(i => i.name === itemName);
        return item ? `${item.name} (${item.description || item.damage})` : itemName;
    });

    return {
        class: className,
        items: items
    };
}


// colores
const colors = ['#00FF00', '#1E90FF', '#FFFFFF', '#FFA500', '#FF4500', '#00FFFF', '#FF00FF'];
let currentColorIndex = 0;

function changeColor() {
    const newColor = colors[currentColorIndex];
    document.body.style.setProperty('--primary-color', newColor);
    document.getElementById('color-btn').style.backgroundColor = newColor;
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

document.getElementById('color-btn').addEventListener('click', changeColor);
changeColor();


// Ejemplo: Generar un loadout para Marine
console.log(generateLoadout("Marine"));

// Función para cargar los ítems desde el archivo JSON
function cargarItems(categoria) {
    fetch('data.json')
        .then(response => response.json())  // Parsear el JSON
        .then(data => {
            const items = data[categoria] || [];
            const tableBody = document.getElementById("items-table");

            // Limpiar la tabla antes de llenarla
            tableBody.innerHTML = '';

            // Llenar la tabla con los ítems de la categoría seleccionada
            items.forEach(item => {
                const nombre = item.nombre || "-";  // Si no hay nombre, colocar "-"
                const descripcion = item.descripcion || "-";  // Si no hay descripción, colocar "-"
                const precio = item.precio || "-";  // Si no hay precio, colocar "-"
                
                const row = `<tr>
                    <td>${item.nombre}</td>
                    <td>${item.descripcion}</td>
                    <td>${item.precio}</td>
                </tr>`;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}