document.getElementById('btn').addEventListener('click',getImageOfTheDay);

let picture = document.getElementById('current-image-container');
let current_image = document.getElementById('current-picture')
const APIKEY = '4QLNcg7cxMVpOfjkrrC0yl4NgUSk9kmlT7xeMISK';
const apodUrl = 'https://api.nasa.gov/planetary/apod';
let picture_detail = document.getElementById('pictureDetail');
let searches = JSON.parse(localStorage.getItem("searches")) || [];
let search_history = document.getElementById('search-history-container')
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input").value;

function getCurrentImageOfTheDay(){
    const currentDate = new Date().toISOString().split("T")[0];
    fetch(`${apodUrl}?api_key=${APIKEY}&date=${currentDate}`)
        .then((response)=>{
            console.log(response)
            return response.json()

        }).then((data)=>{
            picture_detail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;
            current_image.src = data.url;

            })
}

 function getImageOfTheDay(date){
    // const selctedDate = document.getElementById('search-input').value;
    fetch(`${apodUrl}?api_key=${APIKEY}&date=${date}`)
        .then((response)=>{
            console.log(response)
            return response.json()

        }).then((data)=>{
            picture_detail.innerHTML = `<h2>${data.title}</h2><p>${data.explanation}</p>`;
            current_image.src = data.url;

            saveSearch(date);
            addSearchToHistory();
            })
    
}

function saveSearch(date){
    searches.push(date);
    localStorage.setItem('searches',JSON.stringify(searches))
}
function addSearchToHistory() {
    search_history.innerHTML = "";
  
    for (let i = searches.length - 1; i >= 0; i--) {
      const searchItem = document.createElement("li");
      searchItem.innerText = searches[i];
      searchItem.addEventListener("submit", () => {
        getImageOfTheDay(searches[i]);
      });
      search_history.appendChild(searchItem);
    }
  }
  
  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const date = searchInput;
    getImageOfTheDay(date);
  });

  addSearchToHistory();
