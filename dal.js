const MongoClient   = require('mongodb').MongoClient;
const url           = 'mongodb://localhost:27017';
let db              = null;

// connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log("Connected successfully to db server");

    // connect to myproject database
    db = client.db('myproject');
});

// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });
    })
}

// find user with given email and password, returns an empty array if doesn't exist
function login(email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.
        collection('users')
        .find(
            {$and:
                [
                    {"email": {$eq: email}},
                    {"password": {$eq: password}}
                ]
            }
        ).toArray(function(err, docs) {
            err ? reject(err) : resolve(docs);
        });
    });
}

// deposit into database
function deposit(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        balance = parseInt(balance);
        collection.updateOne(
            {"email":email},
            {$inc: {"balance":balance}},
            function(err, result) {err ? reject(err) : resolve(result);}
        );
    });
}

// withdraw from database
function withdraw(email, balance) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');        
        balance = parseInt(balance);
        collection.updateOne(
            {"email":email},
            {$inc: {"balance":-balance}},
            function(err, result) {err ? reject(err) : resolve(result);}
        );
    });
}

// all users
function all(){
    return new Promise((resolve, reject) => {
        const collection = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });
    })
}

// find one user account
function find(email){
    return new Promise((resolve, reject) => {
        const collection = db.collection('users')
            .find({
                "email": email
            })
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
            });

    })
}

module.exports = {create, login, deposit, withdraw, all, find};