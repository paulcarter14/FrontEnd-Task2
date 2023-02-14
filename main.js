let API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
let form = document.querySelector('form');
let input = document.querySelector('#search-input');
let input_color = document.querySelector('#color-input');
let page = 1;
let backButton = document.querySelector("#back");
let nextButton = document.querySelector("#next");
// "Start value / New Search" för sökterm och färg.
let search1;
let color1;
// "Old Search", tar över "New Search" värde när en ny sökning görs.
let search2;
let color2;

// Skapa en räknare för Search
let counter = 0;

form.addEventListener('submit', e => {
  e.preventDefault();
  search1 = input.value;
  color1 = input_color.value;
  search(search1, color1);
  counter++;
});

backButton.addEventListener ('click', e => {
  page--;
  search2 = search1;
  color2 = color1;
  search(search2, color1);
  if (page===1) {
    backButton.setAttribute('disabled', 'disabled');
  }
});

nextButton.addEventListener('click', e => {
  page++;
  search2 = search1;
  color2 = color1;
  search(search2, color1);
  if (page > 1) {
    backButton.removeAttribute('disabled');
  }
});

async function search(query, color) {
  // let searchTerm = input.value;
  // let colorTerm = input_color.value;
  let container = document.querySelector('.display-container');
  container.hidden = false;
  //Vi behöver spara url för att att endast ändra page (förmodligen på en separat variabel som endast ändrar på page.).
  let API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${query}&colors=${color}&per_page=10&page=${page}`;

  form.onclick = event => {
    counter++;
  }

  let response = await fetch(API_URL);
  let json = await response.json();
  
  for (let i = 0; i < 10; i++) {
    let image =json.hits[i];
    let resultContainer = document.querySelector(`#result-${i + 1}`);

    while (resultContainer.firstChild) {
      resultContainer.removeChild(resultContainer.firstChild);
    }
    let imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    resultContainer.appendChild(imgElement);

    let tagg = json.hits[i].tags;
    let taggElement = document.createElement('p')
    taggElement.textContent = tagg;
    resultContainer.appendChild(taggElement)

    let namePhotografer = json.hits[i].user;
    let nameElement = document.createElement('p');
    nameElement.textContent = 'Taken by: ' + namePhotografer;
    resultContainer.appendChild( nameElement);
  }
};

// backButton.addEventListener('click', e => {
//   e.preventDefault();
//   if (page > 1) {
//     page--;
//     search();
//     backButton.removeAttribute('disabled');
//   }
//   else{
//     backButton.setAttribute('disabled', 'disabled')
//   } 
  
// });