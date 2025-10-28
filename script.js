
async function iniciarJuego() {

    try {
        // --- CARGO LOS DATOS ---

        const response = await fetch('songs.json');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const artistsList = await response.json();

        
        // --- ARTISTA ---

        // Calculamos un índice aleatorio
        const randomArtistIndex = Math.floor(Math.random() * artistsList.length);
        
        // Selecciono un artista random
        const selectedArtist = artistsList[randomArtistIndex];

        // Extraemos el nombre de ese objeto
        const artistName = selectedArtist.artist; // p.ej: "Queen"

        // Lo pinto en el html
        const artistElement = document.getElementById("artist-name");
        
        artistElement.textContent = "Artista - " + artistName;


        // --- CANCION ---

        // De ese artista que ya elegimos, tomamos su array 'songs'
        const songsList = selectedArtist.songs;

        // Calculamos un índice aleatorio
        const randomSongIndex = Math.floor(Math.random() * songsList.length);
        
        // Usamos el índice para seleccionar el objeto de la canción
        const selectedSong = songsList[randomSongIndex]; // p.ej: { name: "Bohemian Rhapsody", lyrics: "..." }

        const songName = selectedSong.name;

        

        // --- LETRA ---

        // De esa cancion seleccionada tomamos su array de lyrics
        const lyricsList = selectedSong.lyrics;

        // Calculamos un indice aleatorio exceptuando el ultimo ya que vamos a solicitar 2 barras
        const randomLyricIndex = Math.floor(Math.random() * lyricsList.length-1);

        const selectedLyric = lyricsList[randomLyricIndex];
        const selectedLyric2 = lyricsList[randomLyricIndex+1];

        const lyricElement = document.getElementById("lyric-snippet");

        lyricElement.textContent = selectedLyric + '\n' + selectedLyric2;



        // --- OPCIONES ---

        const optionsElement = document.getElementById("options-list");

        // Iteramos por la lista de canciones del artista
        songsList.forEach(song => {
            // Creamos un nuevo elemento <option>
            const option = document.createElement('option');
            
            // El 'value' es lo que compararemos (el nombre de la canción)
            option.value = song.name; 
            
            // 'textContent' es lo que ve el usuario
            option.textContent = song.name; 
            
            // Añadimos la opción al <select>
            optionsElement.appendChild(option);
        });





    } catch (error) {
        console.error('Falló la carga o procesamiento del juego:', error);
    }
}

iniciarJuego();