var express = require('express');
var sql = require('mssql');


exports.inserttask = function (req, res) {
    var table = new sql.Table('Task'); // or temporary table, e.g. #temptable 
    table.create = true;
    table.columns.add('ID', sql.Int, {
        nullable: false,
        primary: true
    });
    table.columns.add('Title', sql.VarChar(50), {
        nullable: true
    });
    table.rows.add(Math.random(), 'test');

    var request = new sql.Request();
    request.bulk(table, function (err, rowCount) {
        // ... error checks 
        res.send({
            error: err,
            rowCount: rowCount
        });
    });
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