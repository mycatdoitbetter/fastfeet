import { Router, response } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import PackageController from "./app/controllers/PackageController";
import NotificationController from "./app/controllers/NotificationController";

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

// PACKAGES
routes.post("/packages/create", PackageController.store);
routes.get("/packages/list", PackageController.list);
routes.get("/packages/list-all", PackageController.listAll);
routes.get("/packages/list-canceled", PackageController.listCanceled);
routes.put("/packages/update-start-date", PackageController.updateStartDate);
routes.put("/packages/update-end-date", PackageController.updateEndDate);
routes.put("/packages/cancel", PackageController.updateCancel);
routes.delete("/packages/delete", PackageController.delete);

// NOTIFICATIONS

routes.get("/notifications/list", NotificationController.list);

export default routes;
