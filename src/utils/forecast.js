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
    callback(undefined ,response.body.weather[0].description + ' Presently ' + '.It is currently ' + response.body.main.temp + ' celsius out there '+'And Humidity is '+ response.body.main.humidity+' out there! ')
  }
 
})
}


module.exports = forecast