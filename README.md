# Time Travel App

## Overview
This is a travel application that allows user to get information on upcoming trip such as weather report, days left for vacation, picture of destination city with the aid of external api (Weatherbit API, Geonames API, Pixabay API).

### Prerequisites
You need `node` and `npm` installed on your system to be able to run and build this project.

## Project Setup
- Create starter code using html, css and javascript.
- Generate node_modules folder with `npm install -S`.
- Ensure name corresponds to file name in the package.json.
- Install all dependencies.
- Create a babel.rc file with required statements.
- Sign up for API credentials.
- Create webpack config files named `webpack.prod.js` and `webpack.dev.js` for production and development mode respectively with their required dependencies and attributes in the module.exports.
- Modify build command to use both config files in package.json `build-dev:webpack --config webpack.dev.js` and `build-prod:webpack --config webpack.prod.js`.
- Generate dist folder by running `npm build-prod`.
- Build app with `npm run build-dev`.
- Install webpack dev server and edit the build-dev npm script to use webpack dev server to watch for new changes and compile automatically `webpack-dev-server --config webpack.dev.js --open`.
- Change css files to sass files and import to index.js file(client folder) and remove reference from index.html.
- Service-workers set up for offline functionality in app.

## Running Project
After downloading files or cloning the repository
- Install all dependencies with `npm install -S`.
- Create dist folder by running `npm run build-prod`.
- Start the server by running `npm start`.
- Run `npm build-dev` to start a dev server for the webpage.

## How to use 
current location, destination city and departure date is entered into the input field in the form section and submitted. The picture of the destination city, weather report, departure date and days left to trip is displayed in the result section.

## Extended Feature
- Allow user to print their trip and export to pdf.
- Allow user to remove trip.