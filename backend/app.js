const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const cors = require("cors");

const app = express();

// CORS Configuration
let corsOptions = {
  origin: ["http://localhost:5173"],
};
app.use(cors(corsOptions));

// Body Parser Configuration
app.use(bodyParser.urlencoded({ extended: true }));

// Apply body-parser middleware only to specific routes or methods if needed
app.use((req, res, next) => {
  // Skip JSON parsing for DELETE requests
  if (req.method === "DELETE") {
    return next();
  }

  bodyParser.json()(req, res, next);
});

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import and use routes
const entities = [
  "account",
  "company",
  //   "damage",
  "product",
  //   "expense",
  //   "inventory",
  //   "invoice",
  "sales",
  "stakeholder",
  //   "transaction",
  //   "user",
  //   "batch",
  "customer",
  "inventory",
];
entities.forEach((entity) => {
  const routes = require(`./entities/${entity}/${entity}Routes`);
  app.use(`/api/${entity}`, routes);
});

module.exports = app;
