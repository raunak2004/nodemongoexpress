var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var router = function (common) {
    bookRouter.route('/')
        .get(function (req, res) {
            mongodb.connect(common.mongodbUrl, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(function (err, results) {
                    res.send(results);
                });
            });

        });

    bookRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.param.id);
            mongodb.connect(common.mongodbUrl, function (err, db) {
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