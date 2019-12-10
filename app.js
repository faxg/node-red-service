var createError = require('http-errors');
var express = require('express');
var exphbs  = require('express-handlebars');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var RED = require('node-red');
var http = require('http');


var indexRouter = require('./routes/index');
//var discoveryRouter = require('./routes/discovery');

var app = express();
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
  httpAdminRoot:"/editor",
  httpNodeRoot: "/api",
  userDir:"./workspace",
  flowFilePretty: true,
  flowFile: "flows.json",
  nodesDir: "./custom-nodes",
  credentialSecret: '(get this from keystore)',
  disableEditor: false,
  httpNodeCors: true,
  ui : { path: 'dashboard' },

  httpNodeMiddleware: function(req,res,next) {
    // Perform any processing on the request.
    // Be sure to call next() if the request should be passed
    // to the relevant HTTP In node.

    //TODO copy Istio/Jaeger HTTP headers to responce for tracing
    next();
  },

  // enables global context
  functionGlobalContext: { 
    os:require('os'),
  },

  // Editor Theme and project configuration
  editorTheme: {
    projects: {
        enabled: true
    }
  },

  
};

RED.init(server,settings);


// Serve the editor UI
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);


// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({extname: '.handlebars'}));
app.set('view engine', 'handlebars');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
//app.use('/discovery', discoveryRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {expressApp: app, RED: RED, server: server}
