const search_Form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const display_image = document.getElementById(
  "current-image-container"
);
const current_image = document.getElementById("current-image");
const current_detail = document.getElementById("current-detail");
const search_history = document.getElementById("search-history");
const APIKEY = "4QLNcg7cxMVpOfjkrrC0yl4NgUSk9kmlT7xeMISK"

let searches = JSON.parse(localStorage.getItem("searches")) || [];

function getCurrentImageOfTheDay() {
    //current date in a specific format
  const currentDate = new Date().toISOString().split("T")[0];
  const apodUrl = `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&date=${currentDate}`;

  fetch(apodUrl)
    .then((response) => response.json())
    .then((data) => {
      current_detail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;
      current_image.style.backgroundImage  = `url(${data.url})`;
    })
    .catch((e) => {
      console.error(e);
    });
}

function getImageOfTheDay(date) {
  const apodUrl =  `https://api.nasa.gov/planetary/apod?api_key=${APIKEY}&date=${date}`;

  fetch(apodUrl)
    .then((response) => response.json())
    .then((data) => {
      current_image.style.backgroundImage = `url(${data.url})`;
      current_detail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;

      saveSearch(date);
      addSearchToHistory();
    })
    .catch((e) => {
      console.error(e);
    });
}

function saveSearch(date) {
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory() {
  search_history.innerHTML = "";

  for (let i = searches.length - 1; i >= 0; i--) {
    const searchItem = document.createElement("li");
    searchItem.innerText = searches[i];
    searchItem.addEventListener("click", () => {
      getImageOfTheDay(searches[i]);
    });
    search_history.appendChild(searchItem);
  }
}

search_Form.addEventListener("submit", (event) => {
  event.preventDefault();
  const date = searchInput.value;
  getImageOfTheDay(date);
});

getcurrent_imageOfTheDay();
