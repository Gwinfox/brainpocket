const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

const swaggerOptions = {
  withCredentials: true,
  definition: {
    openapi: "3.0.0",
    info: {
      title: "facekontact API",
      version: "1.0.0",
      description: "API documentation for facekontact",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "user",
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js"), path.join(__dirname, "../controllers/*.js")],
};
const specs = swaggerJsdoc(swaggerOptions);

module.exports = specs;
