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
  const url = `https://marcus-diasdev.github.io/Meu-Spotify/api-artists/artists.json?name_like=${searchTerm}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {displayResults(filteredResults);
    });
}

function displayResults(result) {
  resultPlaylist.classList.add('hidden');
  const artistName = document.getElementById('artist-name');
  const artistImage = document.getElementById('artist-img');
  const artistGenre = document.querySelector('.artist-categorie')

  result.forEach(element =>  {
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
    artistGenre.innerText = element.genre;
  });

  resultsArtist.classList.remove('hidden');
  artistName.innerText = '';
  artistImage.src = '';
  artistGenre.innerText = '';

  if (result.length > 0) {
    const element = result[0]; 
    artistName.innerText = element.name;
    artistImage.src = element.urlImg;
    artistGenre.innerText = element.genre;
    resultsArtist.classList.remove('hidden');
  } else {
    resultsArtist.classList.add('hidden');
  }
}

document.addEventListener('input', function() {
  const searchTerm = searchInput.value.toLowerCase();
  if(searchTerm === '') {
    resultPlaylist.classList.add('hidden');
    resultsArtist.classList.remove('hidden');
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
