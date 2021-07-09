const express = require('express');
const app = express();
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const fileupload = require('express-fileupload');
const { host, port } = require('./config/index');

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Acelera by AC Factoring",
        version: "0.0.5",
        description: "Acelera + SQL Server",
        contact: {
            name: "Hackmonkeys Team",
            url: "https://www.hackmonkeys.com"
        }
    },
    basePath: "/",
    server: [
        {
            url: `http://${host}:${port}`
        },
        {
            url: `http://${host}`
        }
    ],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            name: "Administrativo",
            description: "Módulo que se encarga de gestionar los mantenedores"
        },
        {
            name: "Operativo",
            description: "Módulo que se encarga de desarrollar la logica del negocio"
        },
    ],
    schemas: ["http", "https"]
};

//const routesApis = ["routes/*.js"];
const routesApis = ["documentation/*.yaml"];

const options = {
    swaggerDefinition,
    apis: routesApis
};

const specs = swaggerJsdoc(options);
app.use(fileupload({
    createParentPath: true
}))
app.use(cors());

app.use(express.static(path.resolve(__dirname, 'public')));

app.use(express.json({ limit: '5mb' }));

app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use("/api-docs", swaggerUI.serve);

app.get("/api-docs", swaggerUI.setup(specs, { swaggerOptions: options }));

app.use(require('./routes/index'));

app.listen(port, () => {
    console.log(`Server listening on: http://${host}:${port}`);
});
