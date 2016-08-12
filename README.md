# Threejs React Webpack Node




## Demo site:
TODO: [https://ozkey.com/](https://ozkey.com/)


## Motivation

The aim of this repo is to learn and play with Threejs, React and Mongo DB

## Instructions

# Install MongoDB
Note: Make sure you have the directory and its permissions setup (i.e. `/data/db`):
```bash
sudo mkdir -p /data/db
sudo chown -R `id -u` /data/db
```

**Run your mongoDB server**
```bash
mongod
or
C:/MongoDB/Server/3.2/bin/mongod --dbpath C:/MongoDBdata/
```

### Build & Dev

**Installation**
```bash
# Install node modules - this includes those for production and development
# You only need to do this once :)
npm install
```

**Development**

```bash
# Starts the server with Hot Reloading
# Run webpack through webpack.config.dev.js
npm run dev

```

**Production**

Run the commands below for a production build, i.e. what is deployed to Heroku. If you are deploying to Heroku or similar, we assume that you are serving the pages over HTTPS.

```bash
# Clean public folder
# Run webpack through webpack.config.prod.js
npm run build

# Start server
## Note: You need MongoDB running
npm start
```

**Deployment**

TODO

## Unit Tests

Testing with:
- `karma` as test runner
	- `karma.conf.js` for the main karma configuration (it has webpack configurations)
	- `tests.webpack.js` which is the single entry file. It uses `webpack`'s require API to find all the files we need that have a `-test.js` suffix.
- `mocha` as the test framework
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

We have unit tests for async (redux) actions, reducers, and components.

## Data Flow

A simplistic representation of data flow from server to client is:

```
Express app.use() receives a request
-> Calls a pre-built webpack file for the server
-> Runs matching of routes in react-router for server
-> Makes async data fetching request
-> Renders Route component to string
-> Construct HTML file (with Meta, Link tags using helmet)
-> Browser receives html file with initial state
-> Client side React.JS kicks in and initializes with given state
-> Continues where it left off
-> Everyone is happy :)
```

More TBD

## Redux DevTools

You will have to install redux devtools extension from [here](https://github.com/zalmoxisus/redux-devtools-extension) and then everything should just work!

## Yeoman Generator
If you like using yeoman generators, you could check out [this](https://github.com/iiegor/generator-react-webpack-node) cool yeoman generator by @iiegor!

## FAQ
1. Where do you compile your **css**?
	We use [ExtractTextPlugin](https://github.com/webpack/extract-text-webpack-plugin) to extract compiled css in our [webpack config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.prod.js).
	Read more about **postcss** and **Css modules** [here](https://github.com/choonkending/react-webpack-node/blob/master/docs/css.md).
2. What loaders do you use for ES6/ ES2015?
	[babel-loader](https://github.com/babel/babel-loader). Seriously, try it!
3. Google Authentication does not work locally or on heroku!
	1. Follow [these steps from Google](https://developers.google.com/identity/protocols/OpenIDConnect) to create your API  keys on [Google Developers Console](https://console.developers.google.com/)
	2. Under APIs & Auth, Copy your Client ID and Client Secret

**Dev**

- For Google Auth to work locally, you need to do the following in your terminal before starting the server:

```bash
export GOOGLE_CLIENTID=YOUR_CLIENTID
export GOOGLE_SECRET=YOUR_SECRET
```

**Google Analytics**

Google Analytics are there if you want them and very easy to enable the basic site level support. All you need to do is replace the tracking ID in `app/server.jsx`

To learn about how to best use Google Analytics for your site [read more](https://developers.google.com/analytics/devguides/collection/analyticsjs/) here.

## Credits

Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap), [isomorphic-redux-app](https://github.com/caljrimmer/isomorphic-redux-app) and [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate/blob/master/README.md)

License
===============
MIT
