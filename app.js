var express = require('express')
var cors = require('cors')
var multer = require('multer');

var app = express()
var upload = multer();

var port = process.env.PORT || 8080;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(upload.array()); 

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.get('/', function (req, res) {
    var requestHeader = [];
    for (const [key, value] of Object.entries(req.headers)) {
        requestHeader.push({"key": key, "value": value});
    }

    var queryParam = [];
    for (const [key, value] of Object.entries(req.query)) {
        queryParam.push({"key": key, "value": value});
    }

    res.render("index", {
        requestType : "GET",
        requestHeader: requestHeader,
        queryParam : queryParam,
    });
})

app.post('/', function (req, res) {
    var requestHeader = [];
    for (const [key, value] of Object.entries(req.headers)) {
        requestHeader.push({"key": key, "value": value});
    }

    var queryParam = [];
    for (const [key, value] of Object.entries(req.query)) {
        queryParam.push({"key": key, "value": value});
    }

    var formData = [];
    for (const [key, value] of Object.entries(req.body)) {
        formData.push({"key": key, "value": value});
    }

    res.render("index", {
        requestType : "POST",
        requestHeader: requestHeader,
        queryParam : queryParam,
        formData: formData
    });
})

app.listen(port, () => {
    console.log('GET/POST plugin test running at port ', port);
})