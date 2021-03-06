const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath)) 

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ryan Kirshenbaum'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title:'About Me',
        name:'Ryan Kirshenbaum'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help Page',
        helpText:'This is some helpful text',
        name: 'Ryan Kirshenbaum'
    })
})

app.get('/weather', (req, res) => {
    const locationArgument = req.query.address

    if (!locationArgument) {
        res.send({
            error: 'Unable to find location. Please try again.'
        })
    } else {
        geocode(locationArgument, (error, {latitude, longitude, locationDescription} = {}) => {
            if (error) {
                return res.send({error})
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({error})
                    }
                    res.send({
                        address: locationArgument,
                        locationDescription,
                        forecast: forecastData
                    })  
                })
            }
        })
    }
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',   
        name:'Ryan Kirshenbaum',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',   
        name:'Ryan Kirshenbaum',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})