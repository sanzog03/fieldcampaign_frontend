# Setting up the FCX Playground

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and wrapped with [CRACO](https://github.com/dilanx/craco).

### Run steps
* Install Node
* Install NVM (optional).
    * If NVM installed, `nvm use`
    * Else, upgrade to latest LTS version. (atleast v.16.17.0)
* Install dependencies using `yarn` or `npm i`
* create `.env` file in the proect root. A copy of `.env.example` with your own Cesium keys.
* `yarn start` to start the project.

# Building the FCX Playground

### Run Steps

* `yarn build`
* The webpacked version is available inside `build/` and is ready for hosting.