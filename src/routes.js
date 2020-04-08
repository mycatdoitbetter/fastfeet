import { Router, response } from "express";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";

import authMiddleware from "./app/middlewares/authJWT";

const routes = new Router();

// SESSIONS
routes.post("/sessions", SessionController.store);

// USER
routes.post("/user/create", UserController.store);
routes.use(authMiddleware);
routes.put("/user/update", UserController.update);

// RECIPIENTS

routes.post("/recipients/create", RecipientsController.store);
routes.put("/recipients/update", RecipientsController.update);
routes.get("/recipients/list", RecipientsController.list);

export default routes;
