import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
      let res = await fetch(`${config.backendEndpoint}/reservations/`);
      console.log(res);
      let data = await res.json();
      return data;
  }
  catch(error){
  // Place holder for functionality to work in the Stubs
    return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  // console.log(reservations)
 /*
  let table = document.getElementById("reservation-table");
  reservations.forEach(ele=>{
      console.log(ele)
      let time = new Date(ele.time).toLocaleTimeString();
      console.log(time.toLocaleLowerCase())
      let row = document.createElement('tr')
      row.innerHTML = `
        <td scope="col">${ele.id}</td>
        <td scope="col">${ele.name}</td>
        <td scope="col">${ele.adventureName}</td>
        <td scope="col">${ele.person}</td>
        <td scope="col">${new Date(ele.date).toLocaleDateString('en-GB')}</td>
        <td scope="col">${ele.price}</td>
        <td scope="col">${new Date(ele.time).toLocaleString('en-IN',{
          day : 'numeric',
          month :'long',
          year  :'numeric',
          hour : 'numeric',
          minute : 'numeric',
          second : 'numeric'
      }).replace(' at',',')}</td>
        
        `;
      table.append(row)
  })

 
 */

  if(reservations && reservations.length)
  {
      document.getElementById('no-reservation-banner').style.display = "none";
      document.getElementById("reservation-table-parent").style.display = "block";
      let table = document.getElementById("reservation-table");

      reservations.forEach(ele=>{
            console.log(ele)
            let time = new Date(ele.time).toLocaleTimeString();
            // console.log(date)
            console.log(time.toLocaleLowerCase())
            let row = document.createElement('tr')
            row.innerHTML = `
                <td scope="col">${ele.id}</td>
                <td scope="col">${ele.name}</td>
                <td scope="col">${ele.adventureName}</td>
                <td scope="col">${ele.person}</td>
                <td scope="col">${new Date(ele.date).toLocaleDateString('en-IN')}</td>
                <td scope="col">${ele.price}</td>
                <td scope="col">${new Date(ele.time).toLocaleString('en-IN',{
                   day : 'numeric',
                   month :'long',
                   year  :'numeric',
                   hour : 'numeric',
                   minute : 'numeric',
                   second : 'numeric'
                }).replace(' at',',')}</td>
                <td scope="col">
                  <button id="${ele.id}" class="reservation-visit-button">
                    <a href="../detail/?adventure=${ele.adventure}">
                      Visit Adventure
                    </a>
                  </button>
                </td>  
            `;
          table.append(row)
      })
  
  }
  else
  {
    document.getElementById('no-reservation-banner').style.display = "block";
    document.getElementById('reservation-table-parent').style.display = "none";

  }
}

export { fetchReservations, addReservationToTable };
