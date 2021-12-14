const resultNav = document.getElementById("resultsNav");
const favoriteNav = document.getElementById("favoritesNav");
const imageContainer = document.querySelector(".images-container");
const saveConfirmed = document.querySelector(".save-confirmed");
const loader = document.querySelector(".loader");

const count = 5;
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=${count}`;

let resultArray = [];
let favorite = {};

function createElements(page) {
  let currentArray = page === "results" ? resultArray : Object.values(favorite);
  currentArray.forEach((result) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const link = document.createElement("a");
    link.href = result.hdurl;
    link.title = "View Full Image";
    link.target = "_blank";

    const image = document.createElement("img");
    image.src = result.url;
    image.alt = "NASA Picture of the Day";
    image.loading = "lazy";
    image.classList.add("card-img-top");

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = result.title;

    const saveCard = document.createElement("p");
    saveCard.classList.add("clickable");
    if (page == "results") {
      saveCard.textContent = "Add to Favorites";
      saveCard.setAttribute(`onclick`, `saveFavorite('${result.url}')`);
    } else {
      saveCard.textContent = "Remove from Favorites";
      saveCard.setAttribute(`onclick`, `removeFavorite('${result.url}')`);
    }

    const cardText = document.createElement("p");
    cardText.textContent = result.explanation;

    const footer = document.createElement("small");
    footer.classList.add("text-muted");

    const date = document.createElement("strong");
    date.textContent = result.date;

    const copyright = document.createElement("span");
    if (!result.copyright) copyright.textContent = " ";
    else copyright.textContent = ` ${result.copyright}`;

    footer.append(date, copyright);
    cardBody.append(cardTitle, saveCard, cardText, footer);
    link.appendChild(image);
    card.append(link, cardBody);
    console.log(card);
    imageContainer.appendChild(card);
  });
}
function updateDOM(item) {
  if (localStorage.getItem("nasa favorite") && item == "favorite") {
    favorite = JSON.parse(localStorage.getItem("nasa favorite"));
  }
  imageContainer.textContent = "";
  createElements(item);
  loader.classList.add("hidden");
}
async function getImages() {
  loader.classList.remove("hidden");
  try {
    const response = await fetch(apiUrl);
    resultArray = await response.json();
    updateDOM("results");
    console("called!!");
  } catch (error) {}
}

function saveFavorite(itemUrl) {
  resultArray.forEach((item) => {
    if (item.url.includes(itemUrl) && !favorite[itemUrl]) {
      favorite[itemUrl] = item;
      console.log(favorite);
      //save confirmed
      saveConfirmed.hidden = false;
      setTimeout(() => {
        saveConfirmed.hidden = true;
      }, 2000);
      //saving to local storage
      localStorage.setItem("nasa favorite", JSON.stringify(favorite));
    }
  });
}

function removeFavorite(itemUrl) {
  delete favorite[itemUrl];
  localStorage.setItem("nasa favorite", JSON.stringify(favorite));
  updateDOM("favorite");
}
getImages();
