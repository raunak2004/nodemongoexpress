/**
 * Module dependencies.
 */

var express = require('express'),
    routes = require('./src/routes'),
    user = require('./src/routes/user'),
    http = require('http'),
    path = require('path'),
    sql = require('mssql'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

var common = {
    'mongodbUrl' : 'mongodb://localhost:27017/libraryapp',
//    'mongodbUrl': 'mongodb://nodeexpress:T8bJfkGNqlnoqOIecShcnszBbxnGojch6Q2LA317mI6aykvnbEA3izT8Kq5YqSCe6hYK8OhhMJXSSD5rF0OkDg==@nodeexpress.documents.azure.com:10250/?ssl=true'
};

//sql based route task route
var taskRouter = require('./src/routes/taskrouter')();
//mongo db based route passing mongodb url
var adminRouter = require('./src/routes/adminrouter')(common);
var bookRouter = require('./src/routes/bookrouter')(common);
var authRouter = require('./src/routes/authrouter')(common);

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
//checks body and creates req.body object
app.use(bodyparser.json());
app.use(bodyparser.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: 'library'}));
//require('./src/config/passport')(app);

//Individual routers
app.use('/tasks', taskRouter);
app.use('/admin', adminRouter);
app.use('/books', bookRouter);
app.use('/auth', authRouter);
app.get('/', routes.index);
app.get('/users', user.list);

//Start listening on server port
http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});