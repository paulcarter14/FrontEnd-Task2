let API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
let form = document.querySelector('#search-button');
let input = document.querySelector('#search-input');
let input_color = document.querySelector('#color-input');

form.addEventListener('click', e => {
  search();
});

input.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    search();
  }
});

async function search() {
  let searchTerm = input.value;
  let colorTerm = input_color.value;
  // const API_URL = 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + searchTerm; GÖR SAMMA SOM UNDERSTÅENDE!
  let API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&colors=${colorTerm}`;

  let response = await fetch(API_URL);
  let data = await response.json()
    for (let i = 0; i < 10; i++) {
      let image = data.hits[i];
      let resultContainer = document.querySelector(`#result-${i + 1}`);
      resultContainer.textContent = "";
      let imgElement = document.createElement('img');
      imgElement.src = image.webformatURL;
      resultContainer.appendChild(imgElement);
    }
};