import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import pageRoute from './route/pageRoute.js'
import photoRoute from './route/photoRoute.js'
import userRoute from './route/userRoute.js'


dotenv.config();

//connection to the DB
conn();

const app = express();
const port = process.env.PORT || 3000;

//ejs template engine
app.set('view engine', 'ejs');

//static files middleware
app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({extended:true}))


// Routes
app.use('/',pageRoute)
app.use('/photos',photoRoute)
app.use('/users',userRoute)




app.listen(port, () => {
  console.log(`Application running on port: ${port}`);
});