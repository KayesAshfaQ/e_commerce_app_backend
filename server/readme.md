# Getting Started

This project is a starting point for a Node application.

## to run server

node file_name.js

or to run the whole dir

node .

### find node packages

- [NPM packages](https://www.npmjs.com)

### add packages using terminal

add : node i or install package_name

to add multiple packages at the same time : node i package_1 package_2 ...

to add with specific version : node i package_name@version_num

to add dev dependency : npm i package_name --save-dev

to add nodemon dev script : inside package.json file add
    "dev": "nodemon ./index.js"
now run using : npm run dev

to activate 'npm start' command add this in script
"start": "node ./index.js"

to install all packages from package.json file : npm i or npm install

### create a simple api

step 1 : create a route
    step 1.1 : inside routes folder create a file
    step 1.2 : import express
    step 1.3 : create a router
    step 1.4 : export the router

step 2 : configure the route in the index.js file
    step 2.1 : import the route file
    step 2.2 : initialize the middleware for the route
