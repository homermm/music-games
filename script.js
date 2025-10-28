// --- FUNCIONES DE LÓGICA ---

async function cargarDatos() {
    const response = await fetch('songs.json');
    if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
    }
    return await response.json();
}

function seleccionarItemAleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
}

function seleccionarLetras(cancion) {
    const listaLetras = cancion.lyrics;
    const indice = Math.floor(Math.random() * (listaLetras.length - 1));
    return [listaLetras[indice], listaLetras[indice + 1]];
}


// --- FUNCIONES DE RENDER (PINTAR EN HTML) ---

function pintarArtista(nombreArtista) {
    const artistElement = document.getElementById("artist-name");
    artistElement.textContent = "Artista - " + nombreArtista;
}

function pintarLetras(letras) {
    const lyricElement = document.getElementById("lyric-snippet");
    lyricElement.textContent = letras.join('\n');
}

function pintarOpciones(listaCanciones) {
    const optionsElement = document.getElementById("options-list");
    
    optionsElement.innerHTML = '<option value="">Selecciona tu respuesta...</option>';

    listaCanciones.forEach(song => {
        const option = document.createElement('option');
        option.value = song.name;
        option.textContent = song.name;
        optionsElement.appendChild(option);
    });
}


// --- FUNCIÓN PRINCIPAL (ORQUESTADOR) ---

async function iniciarJuego() {
    try {
        const artistas = await cargarDatos();
        
        const artistaSeleccionado = seleccionarItemAleatorio(artistas);
        const cancionSeleccionada = seleccionarItemAleatorio(artistaSeleccionado.songs);
        const letrasSeleccionadas = seleccionarLetras(cancionSeleccionada);

        pintarArtista(artistaSeleccionado.artist);
        pintarLetras(letrasSeleccionadas);
        pintarOpciones(artistaSeleccionado.songs);

    } catch (error) {
        console.error('Falló la carga o procesamiento del juego:', error);
    }
}

iniciarJuego();