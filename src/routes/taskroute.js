var express = require('express');
var sql = require('mssql');


exports.createtasktable = function (req, res) {
    var table = new sql.Table('Task'); // or temporary table, e.g. #temptable 
    table.create = true;

    table.columns.add('Title', sql.VarChar(50), {
        nullable: true
    });

    var request = new sql.Request();
    request.bulk(table, function (err, rowCount) {
        // ... error checks 
        res.send({
            error: err,
            rowCount: rowCount
        });
    });
};


exports.inserttask = function (req, res) {
    var request = new sql.Request();
    var title = req.body.title;
    res.send({
        title: title,
        req: req
    });
    //    request.query("INSERT INTO task (Title) VALUES ('test task 1')",
    //        function (err, recordset) {
    //            res.send({
    //                error: err,
    //                rowCount: recordset,
    //                title: title
    //            });
    //        });
};

exports.deletetasks = function (req, res) {
    var request = new sql.Request();
    request.query('delete from task', function (err, recordset) {
        res.send({
            error: err,
            rowCount: recordset
        });
    });
};

exports.droptable = function (req, res) {
    var request = new sql.Request();
    request.query('drop table task', function (err, recordset) {
        res.send({
            error: err,
            rowCount: recordset
        });
    });
};

exports.tasks = function (req, res) {
    var request = new sql.Request();
    request.query('select * from task',
        function (err, recordset) {
            if (recordset) {
                res.render('index', {
                    title: 'Tasks',
                    tasks: recordset
                });
            } else {
                res.send(err);
            }
        });
};