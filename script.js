fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=eminem")
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.error("Error detected: ", err));

