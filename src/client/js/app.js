// Function to POST data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  try {
    const newData = await response.json();
    return newData;
  }
  catch (error) {
    console.log("error", error);
  }
}
/* Function to GET Project Data */
const updateUI = async (allData) => {
  try {
    console.log(allData);
    for (let i = 0; i < allData.length; i++) {
      document.getElementById("dest_city").innerHTML = allData[i].city;
      document.getElementById("departDate").innerHTML = allData[i].departDate;
      document.getElementById("arrivalDate").innerHTML = allData[i].arriveDate;
      document.getElementById("code").innerHTML = allData[i].countrycode;
      document.getElementById("days").innerHTML = allData[i].countdown;
      document.getElementById("lat").innerHTML = allData[i].latitude;
      document.getElementById("long").innerHTML = allData[i].longitude;
      document.getElementById("weather_desc").innerHTML = allData[i].description;
      document.getElementById("weather_temp").innerHTML = allData[i].temp;
      document.getElementById("weather_icon").innerHTML = allData[i].icon;
      document.getElementById("pixabay").setAttribute('src', allData[i].image);
    }
  }
  catch (error) {
    console.log("error", error);
  }
}

// Event listener to add function to existing HTML DOM element
let form = document.getElementById('form');
form.addEventListener('submit', handleSubmit);
document.getElementById('print').addEventListener('click', function (e) {
  let result = document.getElementById('result-content');
  let printResult = window.open();
  printResult.document.write(result.innerHTML);
  printResult.document.close();
  printResult.focus();
  printResult.print();
  printResult.close();
});
document.getElementById('delete').addEventListener('click', function (e) {
  form.reset();
  location.reload();
})

function handleSubmit(event) {
  event.preventDefault()
  let location = document.getElementById('destCity').value;
  let countryCode = document.getElementById('code').value;
  let currentLocation = document.getElementById('currentCity').value;
  let departureDate = document.getElementById('date').value;
  let arrivalDate = document.getElementById('date2').value;

  //Countdown Timer
  let countDownDate = new Date(departureDate).getTime();
  // Update countdown every second
  let t = setInterval(function () {
    // to get today's date and time
    let today = new Date().getTime();
    //difference between today's date and countdown date
    let difference = countDownDate - today;
    //time calculation for days, hours, minutes, and seconds
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    //result
    document.getElementById('days').innerHTML = days + "d" + hours + "h" + minutes + "m" + seconds + "s to vacation."
    //if countdown timer expires
    if (difference < 0) {
      clearInterval(t);
      document.getElementById('days').innerHTML = "TRIP EXPIRED"
    }
  }, 1000);

  // Form Validation
  if (location.length == 0) {
    alert('Please enter location');
    return
  }
  else if (departureDate == 0) {
    alert('Please enter departure date');
    return
  }
  console.log("::: Form Submitted :::")
  postData('http://localhost:4040/add', { 'currentLocation': currentLocation, 'city': location, 'countrycode': countryCode, 'departDate': departureDate, 'arriveDate': arrivalDate }) // send the formText with get or post
    .then(function (allData) {
      console.log(allData);
      updateUI(allData);
    })

}


export { handleSubmit, postData, updateUI }