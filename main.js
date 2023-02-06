const API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
const form = document.querySelector('#search-button');
const input = document.querySelector('#search-input');

form.addEventListener('click', e => {
  search();
});

input.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    search();
  }
});

function search() {
  const searchTerm = input.value;
  const API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}`;

  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      for (let i = 0; i < 10; i++) {
        const image = data.hits[i];
        const resultContainer = document.querySelector(`#result-${i + 1}`);
        resultContainer.innerHTML = "";
        const imgElement = document.createElement('img');
        imgElement.src = image.webformatURL;
        resultContainer.appendChild(imgElement);
      }
    });
}