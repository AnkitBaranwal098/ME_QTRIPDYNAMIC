import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // console.log(search)
  const params = new URLSearchParams(search);
  return params.get('city')
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let url = `${config.backendEndpoint}/adventures?city=${city}`;
    let res = await fetch(url);
    let data = await res.json();
    return data;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  // console.log(adventures);
  let parent = document.querySelector("#data");

  adventures.forEach((key) => {
    let id = key.id;
    let category = key.category;
    let image = key.image;
    let name = key.name;
    let costPerHead = key.costPerHead;
    let duration = key.duration;
    let newElement = document.createElement("div");
    newElement.className = "col-sm-6 col-lg-3 mb-4";

    newElement.innerHTML = `
    
    <a href="detail/?adventure=${id}" id=${id}>
      <div class="activity-card">
        <img src=${image} alt="">
        <div class="category-banner">${category}</div>
        <div class="d-flex justify-content-between mb-1 px-2">
          <h6>${name}</h6>
          <h6>&#8377 ${costPerHead}</h6>
        </div>
        <div class="d-flex justify-content-between px-2">
          <h6>Duration</h6>
          <h6>${duration} hours</h6>
        </div>
      </div>
    </a>
    `;
    parent.append(newElement);
  });
}
//class="d-flex flex-column flex-lg-row justify-content-between"
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
//   // 1. Filter adventures based on Duration and return filtered list
//   console.log("Inside filterByDuration()");
//   // console.log(list)
//   // console.log(low);
//   // console.log(high);
//   let ans = list.filter(key=>{
//     return key.duration>=low && key.duration<=high
// })
//   return ans;


const DurationArr = list.filter((key) => key.duration >= low && key.duration <= high );
return DurationArr;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
// function filterByCategory(list, categoryList) {
//   // TODO: MODULE_FILTERS
//   // 1. Filter adventures based on their Category and return filtered list
//   // console.log("Inside filterCategory()")
//   // console.log(list)
//   // console.log("Category List", categoryList);
//   if(categoryList.length!==0)
//      list1 = list.filter(obj=> {return categoryList.includes(obj.category)})
//   console.log(list1,"category");
//   return list1;
// }

function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  categoryList.forEach(category => {
    list.forEach((key) => {
      if (key.category === category) {
        filteredList.push(key);
      }
    });
  });
  return filteredList;

}




// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  // console.log("Inside filterFunction()")
  // console.log(list);
  // // console.log(filters)
  // let lowhi = document.getElementById('duration-select').value;
  // let low = lowhi.substring(0,lowhi.indexOf('-'));
  // let high = lowhi.substring(lowhi.indexOf('-')+1);
  // list = filterByCategory(list,filters.category);
  // if(low!=='' && high!=='')
  //   list = filterByDuration(list,low,high);
  // let newArr = list;
  // console.log(newArr)
  // return newArr;


  let filteredArray1 = [];
  if (filters["duration"].length > 0 && filters["category"].length > 0)
  {
    let split_duration = filters["duration"].split("-");
    filteredArray1 = filterByDuration(list, parseInt(split_duration[0]), parseInt(split_duration[1]));
    filteredArray1 = filterByCategory(filteredArray1, filters["category"]);
    //console.log(filteredArray1, "Hello");
  }
  else if (filters["duration"].length > 0)
  {
    let split_duration = filters["duration"].split("-");
    filteredArray1 = filterByDuration(list, parseInt(split_duration[0]), parseInt(split_duration[1]));
  }
  else if (filters["category"].length > 0)
  { 
    filteredArray1 = filterByCategory(list, filters["category"]);
  }
  else
  { 
    filteredArray1 = list;
  }
  // Place holder for functionality to work in the Stubs
  return filteredArray1;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters',JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  let filters = JSON.parse(localStorage.getItem('filters'));
  console.log(filters)
  if(filters!==null)
    return filters;
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let parent = document.getElementById("category-list");
  filters.category.forEach(elem=>{
    let newElem = document.createElement('div');
    newElem.className = 'category-filter';
    newElem.textContent = elem;
    parent.append(newElem)


  })
  document.getElementById('duration-select').value = filters.duration
  // document.getElementById('category-list').value = filters.category
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
