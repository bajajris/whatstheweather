const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('postman-request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configs
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

//app.com
//app.com/help
//app.com/about

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Rishabh Bajaj'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Rishabh Bajaj'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Get help',
        name: "Rishabh Bajaj"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'No address found!!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => { //setting the default value of response

        if (error) {
            return res.send({
                error: error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })
        })
    })



})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', errorText: 'Help article not found',
        name: "Rishabh Bajaj"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', errorText: 'Page not found',
        name: "Rishabh Bajaj"
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})