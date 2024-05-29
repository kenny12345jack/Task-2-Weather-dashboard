const container=document.querySelector('.container');
const search=document.querySelector('.search-box button');
const weatherbox=document.querySelector('.weather-box');
const weatherdetails=document.querySelector('.weather-details');
const error=document.querySelector('.not-found');
const cityhide=document.querySelector('.city-hide');
search.addEventListener('click',()=>{
  const APIkey='4f2c3569a570cb0a85cae856808277e2';
  const city=document.querySelector('.search-box input').value;

  if(city=='')
    return;

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`).then(response=>response.json()).then(json=>{

    if(json.cod=='404'){
      cityhide.textContent=city;
      container.style.height='400px';
      weatherbox.classList.remove('active');
      weatherdetails.classList.remove('active');
      error.classList.add('active');
      return;
      

    }
      
  

  const image=document.querySelector('.weather-box img');
  const temperature=document.querySelector('.weather-box .temperature');
  const des=document.querySelector('.weather-box .des');
  const humidity=document.querySelector('.weather-details .humidity span');
  const wind=document.querySelector('.weather-details .wind span');

  if(cityhide.textContent==city){
    return;
  }
  else{
    cityhide.textContent=city;
     container.style.height='555px';
     container.classList.add('active');
      weatherbox.classList.add('active');
      weatherdetails.classList.add('active');
      error.classList.remove('active');
      
      setTimeout(()=>{
        container.classList.remove('active');
      },2500)
  

  switch(json.weather[0].main){
    case 'Clear':
      image.src='clear1.png';
      break;
      case 'Rain':
      image.src='rain1.png';
      break;
      case 'Snow':
      image.src='snow1.png';
      break;
      case 'Clouds':
      image.src='cloud1.png';
      break;
      case 'Mist':
      image.src='mist1.png';
      break;
      case 'Haze':
        image.src='mist1.png';
        break;
      default:
        image.src='cloud1.jpeg';
      
  }
  temperature.innerHTML=`${parseInt(json.main.temp)}<span>℃</span>`;
  des.innerHTML=`${json.weather[0].description}`;
  humidity.innerHTML=`${json.main.humidity}%`;
  wind.innerHTML=`${parseInt(json.wind.speed)}km/h`;
}
  })
});