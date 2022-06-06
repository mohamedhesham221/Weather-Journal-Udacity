/* Global Variables */
let zipCode = document.getElementById('zip'),
    feelings = document.getElementById('feelings'),
    temp = document.getElementById('temp'),
    content = document.getElementById('content'),
    date = document.getElementById('date'),
    description = document.getElementById('description'),
    btn = document.getElementById('generate');

    // Personal API Key for OpenWeatherMap API
const apiKey = '&appid=7aab273f7855030b1879c72b3a93cd7f&units=imperial';
    // OpenWeatherMap API
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

// Create a new date instance dynamically with JS
let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
let localeDate = d.toDateString();

// Event listener to add function to existing HTML DOM element
btn.addEventListener('click', () => {
    /* Function to GET Web API Data*/
const handleApi = async (url) => {
    const res = await fetch(url)
    try {
        if (res.status === 200) {
            const apiData = await res.json();
            //console.log(apiData);
            return apiData;
        } else {
            alert('Invalid Zip Code')
        }
    } catch (error) {
        console.log(error)
    }
}
/* Function to POST data */
const postData = async (url='', appData={}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify(appData)
    })
    try{
        const newPostData = await res.json();
        return newPostData;
    }catch(err) {
        console.log(err);
    }
};
/* Function to GET Project Data */
const getData = async (url) => {
    const res =  await fetch(url)
    try {
        const newGetData = await res.json();
        console.log(newGetData);
        return newGetData;
    } catch (err) {
        console.log(err)
    }
};
//Callback functions to get data from API and POST it to the server then Retrieve it from the server to update UI
handleApi(baseURL+zipCode.value+apiKey).then( data => {
    postData('/addWeather', {temp: data.main.temp, date: localeDate, feelings: feelings.value, weather: data.weather[0].description})
}).then(()=> {
    getData('/all').then(data => {
        date.innerHTML = `Today is "${data.date}"`;
        temp.innerHTML = `${Math.round(data.temp)}&deg;F`;
        content.innerHTML = `your feelings "${data.feelings}"`;
        description.innerHTML = data.weather;
        // reset inputs
        zipCode.value = '';
        feelings.value = '';
    });
})
})





