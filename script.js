const greetingElement = document.getElementById("greeting");
const currentHour = new Date().getHours();

const greetingMessage =
  currentHour >= 5 && currentHour < 12
    ? "Bom dia"
    : currentHour >= 12 && currentHour < 18
    ? "Boa tarde"
    : "Boa noite";

greetingElement.textContent = greetingMessage;

const searchInput = document.getElementById('search-input');
const resultsArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');

function requestApi(searchTerm) {
  const url = `https://marcus-diasdev.github.io/Meu-Spotify/api-artists/artists.json`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      const filteredResults = result.artists.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      displayResults(filteredResults);
    })
    .catch((error) => {
      console.error('Erro ao buscar os dados:', error);
    });
}

function displayResults(result) {
  const artistName = document.getElementById('artist-name');
  const artistImage = document.getElementById('artist-img');
  const artistGenre = document.querySelector('.artist-categorie');

  if (result.length > 0) {
    const element = result[0];
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
    artistGenre.innerText = element.genre;
    resultsArtist.classList.remove('hidden');
    resultPlaylist.classList.add('hidden');
  } else {
    resultsArtist.classList.add('hidden');
    resultPlaylist.classList.remove('hidden');
  }
}

document.addEventListener('input', function() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  if (searchTerm === '') {
    resultPlaylist.classList.remove('hidden');
    resultsArtist.classList.add('hidden');
    return;
  }
  requestApi(searchTerm);
});

document.addEventListener('DOMContentLoaded', () => {
  const closeButton = document.getElementById('close-button');
  const footer = document.querySelector('.footer');

  closeButton.addEventListener('click', () => {
    footer.classList.add('hidden');
  });
});
