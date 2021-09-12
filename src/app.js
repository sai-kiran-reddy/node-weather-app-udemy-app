const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
const path = require('path');
const express = require('express');
const hbs = require('hbs');


// define paths for express config
const viewPath = path.join(__dirname,"../src/templates/view")

const partialsPath = path.join(__dirname,"../src/templates/partials")
const app = express();
const port = process.env.PORT;

//setup handlerbar engine or view location
app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(partialsPath);

//use static path
app.use(express.static(path.join(__dirname,"../public")));

app.get('' ,(req,res) => {

    res.render('index',{
        title:'weather',
        name:'kiran index'
    });
})

app.get('/about' ,(req,res) => {

    res.render('about',{
        title:'about',
        name:'kiran reddy'
    });
})

app.get('/help',(req,res) =>{

    res.render('help',{
        title:'help',
        name:'kiran help'
    })
})

app.get('/weather',(req,res) =>{

    if(req.query.address)
    {
        geocode(encodeURIComponent(req.query.address),(error,{lattitude,longitude,place:location} = {}) => {
            if(error) res.send(error); else forecast (lattitude,longitude, (error, forecastdata) => {
                if(error) res.send(error); else res.send({place:location,forecastdata,address:req.query.address});
              }) ;
        
        });
    }
    else
    {
        res.send('provide address nigga')
    }
})

app.get('/products',(req,res) =>{
    console.log("query params: ",req.query.search);
if(!req.query.search)
{
    return res.send("error mesage")
}
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res) =>{

    res.render('404',{
        message: 'help page not found please cick below items to navigate'
    })
})


app.get('*',(req,res) =>{

    res.render('404',{
        message: 'page not found please cick below items to navigate'
    })
})

app.listen(port || 3000,() => {
    console.log("server is up on port 300");
})