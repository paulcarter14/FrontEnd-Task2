const searchInput = document.querySelector('#search-input');
const searchButton = document.querySelector('#search-button');
const resultsContainer = document.querySelector('#results-container');

searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value;
  fetch(`https://pixabay.com/api/?key=33344475-5182ce2ae8f19dc0adf2e7232&q=${searchTerm}&image_type=photo`)
    .then(response => response.json())
    .then(data => {
      resultsContainer.innerHTML = '';
      data.hits.forEach(hit => {
        const result = document.createElement('div');
        result.classList.add('result');
        result.style.backgroundImage = `url(${hit.webformatURL})`;
        resultsContainer.appendChild(result);
      });
    });
});