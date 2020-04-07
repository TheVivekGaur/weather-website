const path = require('path') //since it is a core node module so we dont need to install it its build in
const express = require('express') //express will expose only one function which is express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast  = require('./utils/forecast')

const app = express()   
const port = process.env.PORT || 3000

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
        helptext:'If you have face any problem with any functionality of this website, feel free to contact us and your problems will be solved.',
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

app.listen(port, ()=> {
 console.log('server is up on port' + port) 
})  
