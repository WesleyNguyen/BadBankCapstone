const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
    console.log('Connected!');

    // database Name
    const dbName = 'myproject';
    const db = client.db(dbName);

    // new user
    var name = 'user' + Math.floor(Math.random()*10000);
    var email = name + '@mit.edu';

    // insert into customer table
    var collection = db.collection('customer');
    var doc = {name, email};
    collection.insertOne(doc, {w:1}, function(err, result) {
        console.log('Document insert');
    });
    
    // update Test
    collection.updateOne(
        {"name": "user9980"},
        {
           $set: {
            "name": "Wesley"
           } 
        }
    )

    collection.find(
        {$and: [{"name": "Wesley"},{"email": "user9980@mit.edu"}]},
        console.log("Testing find: ")
    ).toArray(function(err, docs) {
        console.log('Testing Find again: ', docs);
    });

    // collection.find(
    //     {"email": email},
    // ).toArray(function(err, docs) {
    //     err ? reject(err) : resolve(docs);
    // });

    var customers = db
        .collection('customers')
        .find()
        .toArray(function(err, docs) {
            console.log('Collection:',docs);

            // clean up
            client.close();
    });
});