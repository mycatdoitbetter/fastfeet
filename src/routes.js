import { Router, response } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";

import authMiddleware from "./app/middlewares/authJWT";

const routes = new Router();

// SESSIONS
routes.post("/sessions", SessionController.store);

// USER
routes.post("/user", UserController.store);
routes.use(authMiddleware);
routes.put("/user", UserController.update);

// RECIPIENTS

routes.post("/recipients/create", RecipientsController.store);

export default routes;
