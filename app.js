var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/SSSurvey');
//mongoose.connect('mongodb://localhost/charity_contractor');

const express = require('express')
const methodOverride = require('method-override')

const app = express()

const participant = require('./controllers/participants');
const study = require('./controllers/studies')
//const donation = require('./controllers/donations')

const bodyParser = require('body-parser');

app.use(methodOverride('_method'))

app.use(bodyParser.urlencoded({ extended: true }));

var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

module.exports = app

participant(app)
study(app)

app.listen(process.env.PORT || '3000', () => {
    console.log(`App listening on port 3000!`)
})
