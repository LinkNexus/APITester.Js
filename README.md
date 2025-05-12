# ApiTester.Js

A [NodeJs](https://nodejs.org/)-based tool permitting to rapidly do requests to an endpoint, being either HTTP or SSE. Can be a great tool for testing endpoints during dev phase or to just simply test an existing endpoint to analyse its response structure. It supports text- and also file-based body, making it very versatile.

## Getting Started

1. First of all, install the last version of NodeJs (v.23 and above) for native database connection. You can achieve this rapidly by using tools like [NVM](https://github.com/nvm-sh/nvm).

2. Install all dependencies by using `npm install`

3. Rename the .env.example file into .env and modify the given variables to your convinience.

4. Run all the migrations using `npm run migrations`

5. Build the assets using `npm run build`

6. Run the app with `npm run server`

Note: There is a docker integration of the app for Docker fanatics, but it is note that requests to localhost and other local domains will not be effective because of Docker closed nature, since requests are done by NodeJS and not the browser.
You can pull the Docker image with the command `docker pull levynkeneng205/apitester-js:latest` and run it with `docker run -p 3333:3333 levynkeneng205/apitester-js:latest`

## Features

- Very simple and easy to use, just one form to fill to create the request
- Supports HTTP as well as SSE requests
- Permits the upload of different type of data, from simple text, through json, xml to even FormData
- Permits also the upload of files.
- Setting of headers
- Support of Query Params
- Can import requests from cURL
- Possibility to create and manage requests collections
- Integrated search

## License

ApiTester.Js is available through the MIT License

## Credits

Levy Nkeneng (LinkNexus) creator, sole and principal maintainer of the project.
