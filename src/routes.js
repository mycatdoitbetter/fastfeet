import { Router } from "express";
import multer from "multer";
import multerConfig from "./config/multer";

import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import RecipientsController from "./app/controllers/RecipientsController";
import FileController from "./app/controllers/FileController";
import ProviderController from "./app/controllers/ProviderController";
import PackageController from "./app/controllers/PackageController";
import NotificationController from "./app/controllers/NotificationController";
import ProblemsController from "./app/controllers/ProblemsController";

import authMiddleware from "./app/middlewares/authJWT";

const routes = new Router();
const upload = multer(multerConfig);

// SESSIONS
routes.post("/sessions", SessionController.store);

// AUTH TOKEN MIDDLEWARE
routes.use(authMiddleware);

// USER
routes.get("/user/list", UserController.list);
routes.post("/user/create", UserController.store);
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
routes.get("/notifications/list-all", NotificationController.listAll);
routes.put("/notifications/read/:id", NotificationController.read);

// PROBLEMS

routes.get("/problems/list", ProblemsController.list);
routes.post("/problems/create", ProblemsController.store);

export default routes;
