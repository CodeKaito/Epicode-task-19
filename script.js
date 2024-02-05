let data = "";

let searchInput = document.getElementById("searchField");
let searchResultTitle = document.getElementById("searchResultTitle");
let searchResultsContainer = document.getElementById("searchResult");
let buttonSearch = document.getElementById("button-search");

// Aggiungi un ascoltatore per l'evento "keydown" sull'input di ricerca
searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        buttonSearch.click(); // Simula il click del pulsante
    }
});

buttonSearch.addEventListener("click", () => {
    let value = searchInput.value.trim(); // Rimuovi gli spazi vuoti iniziali e finali
    console.log(value);
    searchInput.value = "";

    searchResultTitle.classList.add("d-block");

    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${value}`)
        .then((response) => response.json())
        .then((json) => {
            data = json;
            console.log(data);

            cardCreation();

        })
        .catch((err) => console.error("Error detected: ", err));
});

let cardCreation = () => {
    searchResultsContainer.innerHTML = "";

    data.data.forEach((item) => {
        let card = document.createElement("div");

        card.classList.add("col-xl-4", "col-lg-6", "col-md-6", "col-sm-12", "mb-4");

        card.innerHTML = `
                      <div class="card" style="width: 18rem; display: flex; justify-content: center">
                          <img src="${item.album.cover}" class="card-img-top rounded mx-auto pt-4" alt="${item.title}" loading="lazy" data-toggle="modal" data-target="#modal-${item.id}">
                          <div class="card-body text-center">
                              <h5 class="card-title">${item.title}</h5>
                              <p class="card-text">${item.artist.name}</p>
                          </div>
                      </div>
                  `;

        searchResultsContainer.appendChild(card);

        modalCreation(item.id, item.title, item.artist.name, item.link);

    });
};

let modalCreation = (id, title, artist, link) => {
    let modal = document.createElement("div");
    modal.innerHTML = `
                  <div class="modal fade" id="modal-${id}" tabindex="-1" aria-labelledby="${title}" aria-hidden="true">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title text-center" id="${title}">${title}&nbsp;</h5>
                        <h5 class="modal-title text-center" id="${artist}"> by ${artist}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <h6><a>${link}</a></h6>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
                `;

    searchResultsContainer.appendChild(modal);
}