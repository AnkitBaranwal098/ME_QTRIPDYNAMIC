import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    let newElement = addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  // let api = "http://3.7.170.97:8082"+"/cities";
  try {
    let api = config.backendEndpoint + "/cities";
    let res = await fetch(api);
    let data = await res.json();
    // console.log(data)
    return data;
  } catch (e) {
    return null;
  }
}

function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let parentElement = document.getElementById("data");

  let newElement = document.createElement("div");
  newElement.className = "col-sm-6 col-lg-3 mb-4";
  newElement.innerHTML = `
  <a id=${id} href="./pages/adventures/?city=${id}">
  <div class="tile">
    <div class="tile-text text-center">
      <h5>${city}</h5>
      <p>${description}</p>
    </div>
    <img class="img-responsive" src=${image} alt="" />
  </div>
</a> 
  `;

  parentElement.append(newElement);
  // console.log(newElement);
  // return newElement;
}
export { init, fetchCities, addCityToDOM };
