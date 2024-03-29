//Necessary imports of packages and functions
const mongoose = require('mongoose');
const Hapi = require('@hapi/hapi');
const inert = require('@hapi/inert');
const path = require('path');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const app = require('./app');
const registerFeats = require('./boot/register_modules')
require('dotenv').config();

//Port number for database
const port = 4001;

//storing the URL of database in a constant to reduce hassle code
const db = process.env.MONGODB_URL

//connecting to the database using mongoose framework
mongoose.connect(db, {
    useNewUrlParser : true,
    useUnifiedTopology: true,
});


const server = new Hapi.Server({
    port,
    router: {
        stripTrailingSlash: true,
    },
    routes: {
        cors:{
            origin:['*'],
            additionalHeaders: ['cache-control', 'x-requested-with', 'access_token'],
        },
        validate: {
            failAction: async (request, h, err) => {
                if(process.env.NODE_ENV === 'production') {
                    return h
                    .response({
                        statusCode: 400,
                        error: 'Bad Request',
                        message: err.message,
                    })
                    .code(400)
                    .takeover();
                }

                return err;
            },
        },
    },

});
app.connectServer(server)

const swaggerOptions = {
    info: {
        title: "NepJobs API",
        version: process.env.npm_package_version,
        description: process.env.npm_package_description,
    },
    securityDefinitions : {
        jwt: {
            type: 'apiKey',
            name: 'access_token',
            in: 'header',
        },
    },
    security: [{ jwt: []}],
    grouping: 'tags',
};

//Starts the server
async function startServer() {
    registerFeats();
    await server.register([
        inert, Vision, {
            plugin: HapiSwagger,
            options: swaggerOptions,
        }
    ]);

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: (request, h) => {
            const {param} = request.params;
            if(param.includes('.')) {
                return h.file(param);
            }
            return h.file('index.html');
        },
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}


let isStopping = false;
async function shutDown() {
    if(!isStopping) {
        isStopping= true;
        const lapse = process.env.STOP_SERVER_WAIT_SECONDS ? process.env.STOP_SERVER_WAIT_SECONDS : 5;
        await server.stop({
            timeout: lapse * 1000,
        })
    }
}

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

async function start() {
    await startServer();
}

start();