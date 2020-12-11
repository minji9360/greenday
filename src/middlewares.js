import routes from "./routes.js";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName = "Green Day";
    res.locals.routes = routes;
    res.locals.user = req.user || null;
    next();
};
