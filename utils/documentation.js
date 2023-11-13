const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is a simple CRUD API application made with Express and documented with Swagger",
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/api/*.js"],
};

module.exports.initDocumentation = (app) => {
    const specs = swaggerJsDoc(options);
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(specs, {explorer: true})
    );
}