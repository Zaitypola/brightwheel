===========================
Brightwheel coding exercise
===========================

Service that sends emails to Spendgrid and Snailgun.

1- Prerequisites

Install node and npm, if on Mac:

`brew install node`

Then run `node -v` and `npm -v` to see that they were installed

2- How to run

To run this service, install all packages first:

`npm install`

Once they are installed, run:

`npm start`

This will start the service on the port given defined in `config/default.yml`

3- Services

Based on the config value `EMAIL_SERVICE` found in `config/default.yml`, the email service will use Spendgrid or Snailgun

