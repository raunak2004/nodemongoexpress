/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./src/routes'),
    user = require('./src/routes/user'),
    http = require('http'),
    path = require('path'),
    sql = require('mssql'),
    bodyparser = require('body-parser');

var taskRouter = require('./src/routes/taskrouter')();
var adminRouter = require('./src/routes/adminrouter')();
var bookRouter = require('./src/routes/bookrouter')();

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
//config section
app.set('port', process.env.PORT || 3000);
//setting up views folder
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));

//Individual routers
app.use('/tasks', taskRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.get('/', routes.index);
app.get('/users', user.list);

//Start listening on server port
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});