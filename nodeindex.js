var express = require('express');
var app     = express();
var cors    = require('cors');
var dal     = require('./dal.js');

//  used to serve static files from public directory
app.use(express.static('public'));
app.use(cors());

//  create user account (this was a placeholder one from before we attempted to add a database)
// app.get('/account/create/:name/:email/:password', function (req, res) {
//     res.send({
//         name:       req.params.name,
//         email:      req.params.email,
//         password:   req.params.password
//     });
// });

// create user account using dal
app.get('/account/create/:name/:email/:password', function (req, res) {
    // else create user
    dal.create(req.params.name,req.params.email,req.params.password).
        then((user) =>{
            console.log(user);
            res.send(user);
        });
});

//  login user dal
app.get('/account/login/:email/:password', function (req, res) {
    dal.login(req.params.email, req.params.password).
        then((user) => {
            console.log(user);
            res.send(user);
        });
});

// deposit into user account
app.get('/account/deposit/:email/:balance', function (req, res) {
    dal.deposit(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);
        });    
});

// withdraw into user account
app.get('/account/withdraw/:email/:balance', function (req, res) {
    dal.withdraw(req.params.email,req.params.balance).
        then((user) => {
            console.log(user);
            res.send(user);
        });    
});

// all accounts using dal
app.get('/account/all', function (req, res) {
    dal.all().
        then((docs) => {
            console.log(docs);
            res.send(docs);
        });
});

app.get('/account/find/:email', function (req, res) {
    dal.find(req.params.email).
        then((docs) => {
        console.log(docs);
        res.send(docs);
    });
});

//  all accounts (placeholder)
// app.get('/account/all', function (req, res) {
//     res.send({
//         name:       'peter',
//         email:      'peter@mit.edu',
//         password:   'secret'
//     });
// });

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);