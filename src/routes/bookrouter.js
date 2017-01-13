var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var router = function () {
    bookRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    res.send(results);
                });
            });

        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.param.id);
            var url = 'mongodb://localhost:27017/libraryapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.findOne({
                    _id: id
                }, function (err, results) {
                    res.send(results);
                });
            });

        });


    return bookRouter;
};

module.exports = router;