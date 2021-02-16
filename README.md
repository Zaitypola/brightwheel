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

`npm run test`

This will run the tests for the feature. Tests verify behavior depending on what the email clients did.

3- Services

Based on the config value `EMAIL_SERVICE` found in `config/default.yml`, the email service will use Spendgrid or Snailgun

The service can be reached by doing POST calls to `api/email` with the bodies provided in the exercise description.

4- Technologies used and why

Seeing that this service does not have any database access nor any heavy logic, I decided to go with NodeJs to be able to ship something fast and lightweight without thinking of types.
Another option with microservices in mind could have been Python+Flask but went with NodeJS since I am more proficient at it.

I used restify as the framework to develop the webservices, close to be the standard in NodeJS.
It is built on top of expressjs, meant to support REST syntax and it's lightweight and faster.
Another option would be using fastify, I have never used it but would test it out with more time.

Framework speeds:
https://www.fastify.io/benchmarks/

5- Services

Services can be configured using `config/default.yml`. Change `EMAIL_SERVICE` to 'spendgrid' or 'snailgun'.
I am getting successful responses when sending requests using Postman with spendgrid, I keep getting 500 with snailgun, I might be missing
something or something's wrong server side.

Snailgun service returns 202 to inform that the email was enqueued.

5- Future work

The managers that I used are meant for individual email cases, the code is the same, depending on the config value you should use
one set of configs (url+api keys) or the other. There is minimum data transformation between the two, but decided to have them separate
in case each manager grows and more requirements need to be added.

I kept getting a 500 error when using Snailgun, using postman.