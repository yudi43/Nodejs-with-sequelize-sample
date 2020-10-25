const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const sequelize = require('./config/database')



//Test the database connection
sequelize.authenticate()
.then(() => console.log("database connection succesful"))
.catch((err) => console.log('This was the error thrown::: ' + err))

const app = express();

// Adding handlebars (middleware)
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.render('index', {layout: 'landing'}));

//gig routes

app.use('/gigs', require('./routes/gigs'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server has started on port ${PORT}`));


