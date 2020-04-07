const request = require('request')
 
const forecast = (latitude , longitude , callback) => {
const url=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=07d1fda637a974131dcc05710002ad42&units=metric`

request({ url: url , json: true } , (error, response) => {
  if(error)
  {
  callback('Unable to connect to weather service' , undefined)

  }else if (response.body.error)
  {
    callback('Unable to find the location' , undefined)
  }
   else {
    callback(undefined , 'Hello, It is '+ response.body.weather[0].description + ' Presently ' + ' And the Temperature currently is ' + response.body.main.temp + ' celsius out there. '+' Humidity is '+ response.body.main.humidity+'% out there whereas ' +' The maximum temperature is '+ response.body.main.temp_max + ' celsius out there' + ' ,with the minimum temperature as '+ response.body.main.temp_min + ' celsius. ' + ' Hope You have a Great Day! ')
  }
 
})
}


module.exports = forecast