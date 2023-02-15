import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let obj = new URLSearchParams(search);
  let adventure = obj.get("adventure");
  // console.log(adventure);
  return adventure;
  // Place holder for functionality to work in the Stubs
  //return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  ///adventures/detail?adventure=<adventure_id>
  try {
    let res = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let data = await res.json();
    return data;
  } catch (err) {
    // Place holder for functionality to work in the Stubs
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let {name, subtitle, images, content} = adventure
  // console.log(name, subtitle, images, content)
  document.getElementById("adventure-name").textContent = name;
  document.getElementById("adventure-subtitle").textContent = subtitle;
  document.getElementById("adventure-content").textContent = content;
  // console.log(images)
  let slides = document.getElementById("photo-gallery");

  images.forEach(src => {

    slides.innerHTML += `
      <img src=${src} class="activity-card-image">
    `
    
  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let slides = document.getElementById("photo-gallery").textContent = '';

  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="slide-indicators">

  </div>
  <div class="carousel-inner" id="slide-show">
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `;

  images.forEach((source,index)=>{
    // let newElem = document.createElement('div');
    document.getElementById("slide-show").innerHTML += `
    <div class="carousel-item${index===0?' active':''}">
      <img src="${source}" class="d-block w-100 activity-card-image" alt="...">
    </div>
    `

    document.getElementById("slide-indicators").innerHTML += `
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${index}" class="${index===0 ? "active":''}" ${index===0 ? "aria-current='true'":''} aria-label="Slide ${index+1}"></button>
    `
  })

  /*
  <div class="carousel-item active">
      <img src="${images[0]}" class="d-block w-100 activity-card-image" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${images[1]}" class="d-block w-100 activity-card-image" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${images[2]}" class="d-block w-100 activity-card-image" alt="...">
    </div>
  */
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure)
  let {available, costPerHead} = adventure
  // console.log(available);
  if(available)
  {
    document.getElementById('reservation-panel-sold-out').style.display = "none";
    document.getElementById('reservation-panel-available').style.display = "block";
    //reservation-person-cost
    document.getElementById('reservation-person-cost').innerHTML = costPerHead;
  }
  else
  {
    document.getElementById('reservation-panel-sold-out').style.display = "block";
    document.getElementById('reservation-panel-available').style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  // console.log(adventure);
  // console.log(persons)
  let {costPerHead} = adventure;
  // console.log(costPerHead)
  document.getElementById('reservation-cost').textContent = `${costPerHead*persons}`
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure)
  let form = document.getElementById('myForm');
  // console.log(form.elements)
  //name, date, person, adventure
  form.addEventListener('submit', async(event)=>{
      event.preventDefault();

      let name = form.elements.fullName.value;
      let date = form.elements.date.value;
      let person = form.elements.person.value;
      let id = adventure.id;

      try{
        let url = `${config.backendEndpoint}/reservations/new`
        // console.log(url)

        let res = await fetch(url,{
        method : "POST",
        body : JSON.stringify({
            name : name,
            date : date,
            person : person,
            adventure : id
          }),
          headers:{
            "content-type":"application/json; charset=UTF-8"
          }
        })
        let data = await res.json();
        console.log(data)
        window.alert("Success!")
        navigation.reload();
      }
      catch(error)
      {
        window.alert("Failed!")
      }
  })

}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  console.log(adventure)
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
