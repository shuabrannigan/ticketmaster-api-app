# TicketMaster Api App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.4. It allows users to search for events using the Ticketmaster API

## Getting started

To get started, clone the reproitory and install the dependencies by running the following comman in the projects root directory


``` bash
npm install
```

## Running the development server

To run the development server, run the following command in the projects root directory
``` bash
ng serve
```
The application will be served at http://localhost:4200/. Any changes made to the code will automatically reload the server.
## Running unit tests

To run unit tests, run the following command in the root directory
```bash
ng test
```
This will run all the unit tests. 

## Setup APIKEY
To see the api working you will need to place an api key in `/src/environments/environments.ts`, you need to assign the APIKEY in this file.

```
export const environment = {
    production: false,
    ticketMasterApiKey: 'ADD OWN API KEY HERE'
}
```

Keys can be found here https://developer.ticketmaster.com/api-explorer/v2/