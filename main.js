let API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
let form = document.querySelector('form');
let input = document.querySelector('#search-input');
let input_color = document.querySelector('#color-input');
let page = 1;
let backButton = document.querySelector("#back");
let nextButton = document.querySelector("#next");
let searchTerm = input.value;
let colorTerm = input_color.value;
//Vi behöver spara url för att att endast ändra page (förmodligen på en separat variabel som endast ändrar på page.).
let API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&colors=${colorTerm}&per_page=10&page=${page}`;



form.addEventListener('submit', e => {
  e.preventDefault();
  search(API_URL);
});

async function search(API_URL) {
  
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



backButton.addEventListener ('click', e => {
  page--;
  search();
  if(page===1){
    backButton.setAttribute('disabled', 'disabled');
  }
});

nextButton.addEventListener('click', e => {
  e.preventDefault();
  page++;
  search();
  backButton.removeAttribute('disabled');
});


