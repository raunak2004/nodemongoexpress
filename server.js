/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./src/routes'),
    user = require('./src/routes/user'),
    taskroute = require('./src/routes/taskroute'),
    http = require('http'),
    path = require('path'),
    sql = require('mssql'),
    bodyparser = require('body-parser');

var nav = [{
    Link: '/Books',
    Text: 'Book'
    }, {
    Link: '/Authors',
    Text: 'Author'
    }];
var taskRouter = require('./src/routes/testroute')(nav);

var config = {
    user: 'raunak2004',
    password: 'Kelmai1986',
    server: 'nodeexpressraunak.database.windows.net',
    database: 'Task',
    options: {
        encrypt: true
    }
};

sql.connect(config, function (err) {
    console.log(err);
});

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', './src/views');

app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/tasks', taskRouter);

app.get('/', routes.index);
app.get('/users', user.list);
//app.get('/createtasktable', taskroute.createtasktable);
//app.get('/tasks', taskroute.tasks);
//app.get('/deletetasks', taskroute.deletetasks);
//app.post('/inserttask', taskroute.inserttask);
//app.get('/droptable', taskroute.droptable);
//app.get('/deletetask/:id', taskroute.deletetask);

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});