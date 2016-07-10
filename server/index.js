import express from 'express';
import webpack from 'webpack';
import { ENV } from './config/appConfig';
import { connect } from './db';
import passportConfig from './config/passport';
import expressConfig from './config/express';
import routesConfig from './config/routes';
import webpackDevConfig from '../webpack/webpack.config.dev-client';
const App = require('../public/assets/server');
const app = express();

/*
 * Database-specific setup
 * - connect to MongoDB using mongoose
 * - register mongoose Schema
 */
connect();

/*
 * REMOVE if you do not need passport configuration
 */
passportConfig();

if (ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

/*
 * Bootstrap application settings
 */
expressConfig(app);

/*
 * REMOVE if you do not need any routes
 *
 * Note: Some of these routes have passport and database model dependencies
 */
routesConfig(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);

// app.listen(app.get('port'));








var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(app.get('port'), (error) => {
  if (!error) {
    console.log(`GAME is running on port: ${app.get('port')}`); // eslint-disable-line
  }
});

io.on('connection', function (socket) {
  
  
  socket.emit('news', { hello: 'world is in io :)' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});













