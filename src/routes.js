import { Router, response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import DeliverymanController from "./app/controllers/DeliverymanController";

import authMiddleware from "./app/middlewares/authJWT";

const routes = new Router();
const upload = multer(multerConfig);

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

//FILES
routes.post("/files", upload.single("file"), FileController.store);

//PROVIDERS
routes.get("/providers", ProviderController.list);

//DELIVERYMAN
routes.post("/deliveryman", DeliverymanController.store);
routes.put("/deliveryman/:id", DeliverymanController.update);
routes.delete("/deliveryman/:id", DeliverymanController.delete);
routes.get("/deliveryman", DeliverymanController.list);
export default routes;
