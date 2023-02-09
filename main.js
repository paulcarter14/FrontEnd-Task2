let API_KEY = '33344475-5182ce2ae8f19dc0adf2e7232';
let form = document.querySelector('#search-button');
let input = document.querySelector('#search-input');
let input_color = document.querySelector('#color-input');
let page = 1;


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
  let API_URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchTerm}&colors=${colorTerm}&per_page=10`;
  //Vi vill skicka detta till sidan + antal bilder per sida.
  
  //tillbaka ska vi få bild,tagg och namn,
  let response = await fetch(API_URL);
  let json = await response.json();
  let tagg = json.hits[0].tags;
  let namePhotografer = json.user;
  for (let i = 0; i < 10; i++) {
    let image =json.hits[i];
    let resultContainer = document.querySelector(`#result-${i + 1}`);
    let imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    resultContainer.appendChild(imgElement);
    //Här ska vi hitta elmementet tagg-1 för att föra in taggen där.
    //samt hitta name-elementet för att föra in de där.
    let taggElement = document.createElement('p')
    taggElement.src =tagg.webformatURL;
    resultContainer.appendChild(taggElement)
  }


    
};