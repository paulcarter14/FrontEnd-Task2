let API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
let form = document.querySelector('#search-button');
let input = document.querySelector('#search-input');
let input_color = document.querySelector('#color-input');
let page = 1;


form.addEventListener('click', e => {
  search();
});
//sätta detta i form för att skippa detta.
input.addEventListener('keydown', e => {
  if (e.keyCode === 13) {
    search();
  }
});

async function search() {
  let searchTerm = input.value;
  let colorTerm = input_color.value;
  //Vi vill skicka detta till sidan + antal bilder per sida.
  let API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&colors=${colorTerm}&per_page=10`;
  
  //tillbaka ska vi få bild,tagg och namn,
  let response = await fetch(API_URL);
  //Fråga om Json är standard. Samt ett format för att lagra info.
  let json = await response.json();
  
  for (let i = 0; i < 10; i++) {
    //be Jakob gå igenom hur man hittade allt som kom med bilden. (tags / id etc)
    let image =json.hits[i];
    let resultContainer = document.querySelector(`#result-${i + 1}`);
    let imgElement = document.createElement('img');
    //djupdyk i detta.
    imgElement.src = image.webformatURL;
    resultContainer.appendChild(imgElement);
    //Här ska vi hitta elmementet tagg-1 för att föra in taggen där.
    //samt hitta name-elementet för att föra in de där.
    let tagg = json.hits[i].tags;
    let taggElement = document.createElement('p')
    taggElement.textContent = tagg;
    resultContainer.appendChild(taggElement)

    let namePhotografer = json.hits[i].user;
    let nameElement = document.createElement('p');
    nameElement.textContent = namePhotografer;
    resultContainer.appendChild(nameElement);
  }
};