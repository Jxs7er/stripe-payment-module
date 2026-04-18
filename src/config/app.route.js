import payments_routes from "../modules/routes/payment.routes.js";

const API_PREFIX = "api";

const reg = (app, url, route, version = `v1`) => {
  const fullPath = `${API_PREFIX}/${version}/${url}`;

  if (process.env.NODE_ENV === "development") {
    console.log("Route registered:", fullPath);
  }

  app.use(fullPath, route);
};

export const register_routes = (app) => {
  reg(app, "payments", payments_routes);
};
