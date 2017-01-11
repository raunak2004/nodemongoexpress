var express = require('express');
var taskRouter = express.Router();
var sql = require('mssql');

taskRouter.route('/task')
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
        table.rows.add(1, 'test');

        var request = new sql.Request();
        request.bulk(table, function (err, rowCount) {
            // ... error checks 
            res.send({
                error: err,
                rowCount: rowCount
            });
        });
    });

module.exports = router;