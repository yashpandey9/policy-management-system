const v1_routes = require("./v1");

const application_routes = (app) => {
    app.use("/v1", v1_routes);
}

module.exports = application_routes;