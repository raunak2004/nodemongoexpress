var express = require('express');
var sql = require('mssql');
var us = require('underscore');
var taskRouter = express.Router();

var router = function (nav) {

    var fetchTasks = function (req, res) {
        var request = new sql.Request();
        request.query('select ID,Title from task',
            function (err, recordset) {
                if (recordset) {
                    res.render('task', {
                        title: 'Tasks',
                        tasks: recordset
                    });
                } else {
                    res.send(err);
                }
            });
    };

    taskRouter.route('/createtasktable')
        .get(function (req, res) {
            var table = new sql.Table('Task'); // or temporary table, e.g. #temptable 
            table.create = true;
            table.columns.add('ID', sql.Int, {
                nullable: false,
                primary: true
            });

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
        });

    taskRouter.route('/inserttask')
        .post(function (req, res) {
            var request = new sql.Request();
            var title = req.body.title;
            request.query("INSERT INTO task (ID,Title) VALUES (" + us.random(1, 32767) + ",'" + title + "')",
                function (err, recordset) {
                    fetchTasks(req, res);
                });
        });

    taskRouter.route('/deletetasks')
        .get(function (req, res) {
            var request = new sql.Request();
            request.query('delete from task', function (err, recordset) {
                res.send({
                    error: err,
                    rowCount: recordset
                });
            });
        });

    taskRouter.route('/deletetask/:id')
        .get(function (req, res) {
            var request = new sql.Request();
            var id = req.params.id;
            request.query('delete from task where ID=' + id,
                function (err, recordset) {
                    fetchTasks(req, res);
                });
        });

    taskRouter.route('/')
        .get(function (req, res) {
            fetchTasks(req, res);
        });
    
    return taskRouter;
}

module.exports = router;