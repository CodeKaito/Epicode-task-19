let data = '';

let searchInput = document.getElementById('searchField');
let searchResultTitle = document.getElementById('searchResultTitle');
let searchResultsContainer = document.getElementById('searchResult');
let buttonSearch = document.getElementById('button-search');

// Aggiungi un ascoltatore per l'evento "keydown" sull'input di ricerca
searchInput.addEventListener("keydown", (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        buttonSearch.click(); // Simula il click del pulsante
    }
});

buttonSearch.addEventListener("click", () => {
    let value = searchInput.value.trim(); // Rimuovi gli spazi vuoti iniziali e finali
    console.log(value);
    searchInput.value = '';

    searchResultTitle.classList.add('d-block');

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${value}`)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            console.log(data);

            searchResultsContainer.innerHTML = '';

            data.data.forEach(item => {
                let card = document.createElement('div');
                card.classList.add('col-md-3', 'col-6', 'mb-4');

                card.innerHTML = `
                    <div class="card" style="width: 18rem; display: flex; justify-content: center">
                        <img src="${item.album.cover}" class="card-img-top rounded mx-auto pt-4" alt="${item.title}">
                        <div class="card-body text-center">
                            <h5 class="card-title">${item.title}</h5>
                            <p class="card-text">${item.artist.name}</p>
                        </div>
                    </div>
                `;

                searchResultsContainer.appendChild(card);
            });
        })
        .catch((err) => console.error("Error detected: ", err));
});