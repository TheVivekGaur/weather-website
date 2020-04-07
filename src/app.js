const path = require('path') //since it is a core node module so we dont need to install it its build in
const express = require('express') //express will expose only one function which is express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()   //it doesnt not take any argument instead we figure out ways for server n tell expredss what it should do
// Define paths for express config
const publicDirectoryPath =path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath)) //it is to customize our server 

app.get('',(req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Vivek Gaur'
    })
})  
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Vivek Gaur'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helptext:'This is some Helpful text.',
        title: 'Help',
        name:'Vivek Gaur'
    })
})
    app.get('/weather',(req , res)=>{
        if(!req.query.address)
        {
            return res.send({
                error: 'You must Provide an address'
            })
        }

       geocode(req.query.address, (error, {latitude , longitude , location}={})=> {
        if(error)
        {
            return res.send({error})
        }
        forecast(latitude , longitude,(error , forecastData)=>{
        if(error)
        {
            return res.send({error})

        }
        res.send({
            forecast:forecastData,
            location,
            address: req.query.address

             })
          })
       }) 
       
    })



     app.get('/products', (req, res)=> {
         if (!req.query.search)
         {
          return  res.send({
                error: 'You must Provide a search term'
            })
         }
       console.log(req.query.search)
        res.send({
         products:[]
     })
     })
    

    //* wildcard character it matches with the routes and the url
   app.get('/help/*', (req, res)=>{
    res.render('404',{
        title:'404',
        name: 'Vivek Gaur',
       errorMessage: 'Help article not found'}
        )
   })
    app.get('*', (req , res)=>{
      res.render('404',{
          title: '404',
          name: 'Vivek Gaur',
          errorMessage:'Page not found'
      })
    })


 //this tells what the server had to do when someone tries to get resouces at specific url maybe we should sending back htlm or json

//app.com  // here we have only one domain app.com and all others will run on s=a single express server
//app.com/help
//app.com/about

app.listen(3000, ()=> {
 console.log('server is up on port 3000') //starting the server is always async process
})  //port 3000 works well for viewing in our local machine
