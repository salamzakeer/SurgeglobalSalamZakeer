var express = require ('express');
var path = require('path');
var cors = require('cors');
require('dotenv').config();

var bodyParser = require ('body-parser');
var Users = require('./routes/Users');

var app = express();

var mongoose = require('mongoose');

var port = process.env.PORT || 5000;


app.use(bodyParser.json());
app.use(cors());

app.use(
    bodyParser.urlencoded({
        extended:false
    })
)




const URI = process.env.MONGODB_URL;

mongoose.connect(URI,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Mongodb Connection successfull");   
})


app.use('/users', Users);

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

app.use(cors(corsOptions));



mongoose
.connect(URI, {useNewUrlParser:true})
.then(()=> console.log('MongoDB connected'))
.catch(err=> console.log(err));





app.listen(port, ()=>{
    console.log("Server is listening on port " + port);
})




