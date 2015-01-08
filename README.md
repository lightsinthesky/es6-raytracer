# ES6 Raytracer

An ES6 based [smallpt](http://www.kevinbeason.com/smallpt/) raytracer ported from Ivan Kuckir's [implementation](http://blog.ivank.net/smallpt-in-javascript.html).

There are two entry points into the code, the client (index.js) and the worker (MonteCarlos.js). The key is using [worker-loader](https://github.com/webpack/worker-loader) for webpack to require the worker from the main client. 

Transpiling is done with [6to5](http://6to5.org/).

## Usage

```sh
npm install
npm start
```

