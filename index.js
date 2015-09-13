var express = require('express');
var fs = require('fs');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var dbconfig = require('./dbconfig.js');

mongoose.connect(`mongodb://nsmith7989:alfa5465@apollo.modulusmongo.net:27017/ityvuq7U`);

var router = express.Router();
var port = process.env.PORT || 4000;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var Joke = require('./app/models/jokes.js');

router
    .get('/', function (req, res) {

        Joke.findRandom().limit(1).exec(function (err, joke) {
            var html = `<!doctype html>
            <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>Pickle Joke</title>
                <link href='https://fonts.googleapis.com/css?family=Roboto:400,500italic' rel='stylesheet' type='text/css'>
                <link rel="stylesheet" type="text/css" href="style.css">
            </head>
            <body>
            <h1>Your random pickle Joke!</h1>
            <h2>${joke[0].text}</h2>
            <br/>
            <br/>
            <h4>Submit your own</h4>
            <form id="submit-form">
                <input type="text" placeholder="title" id="title" />
                <textarea id="text" placeholder="text"></textarea>
                <button>Submit</button>
            </form>
            <script src="app.js"></script>
            </body>
            </html>`;
            res.send(html);
        });
});

router
    .route('/random')
    .get(function(req, res) {
        Joke.findRandom().limit(1).exec(function (err, joke) {
           res.json(joke)
        });
    });

router
    .route('/jokes')
    .post(function (req, res) {

        var joke = new Joke();
        joke.title = req.body.title;
        joke.text = req.body.text;

        joke.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Joke Created'});
        });
    })
    .get(function (req, res) {
        Joke.find({}, function (err, jokes) {
            if (err) {
                res.send(err)
            }
            res.json(jokes)
        })
    });


router
    .route('/jokes/:joke_id')
    .put(function(req, res) {
        Joke.findById(req.params.joke_id, function(err, joke) {
            if (err) {
                res.send(err);
            }
        });
    });


app.use('/', router);


app.listen(port);
