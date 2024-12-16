const express = require('express') // bta rahe ki express ki jarurt hai to bta diya system ya file ko
const app = express() // express function app me store kr liye (app k pas sari functionality hai jisse app bn sakta hai)
const db = require('./db')

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');


app.get('/', function (req, res) {
  res.send('Welcome to my mansion ... How may I help you?')
})


const personRoutes = require('./routes/personRoutes');
const MenuItemRoutes = require('./routes/menuItemRoutes');

app.use('/person',personRoutes);
app.use('/menuItem',MenuItemRoutes);


app.listen(3000,()=>{
    console.log("Your server is active at 3000")
}) // ye jo server banega is 3000 room(port) me rahega