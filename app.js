const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


app.use(bodyParser.json());

//Import Routes
const journalistRoutes = require('./routes/journalist');
const photographerRoutes = require('./routes/photographer');
const accountRoutes = require('./routes/accountDepartment');
const advertiserRoutes = require('./routes/advertiser');
const editorRoutes = require('./routes/Editor');

app.use(cors({
    origin: "*",
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));

app.use('/journalist', journalistRoutes);
app.use('/photographer', photographerRoutes);
app.use('/accountDepartment', accountRoutes);
app.use('/advertiser', advertiserRoutes);
app.use('/editor', editorRoutes);

//making a routes
app.get('/', (req, res) => {
    res.send('We are on home');
});

//connect to db
mongoose.set('strictQuery', false);
mongoose.connect(
    'mongodb://localhost:27017/IT_InTheValley_InformationSystem',() => 
     console.log('BUILD SUCCESSFUL!')
     //mongosh "mongodb+srv://cluster0.a4qlg9v.mongodb.net/myFirstDatabase" --apiVersion 1 --username ashish
     //
)

//start listing to server
app.listen(3001, () => {
    console.log('Server listening on port 3001...');
});
