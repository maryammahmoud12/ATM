import connectionDB from "../DB/connectionDB.js";
import * as routers from "./modules/routes.js";
import { appError, globalErrorHandel } from "./utils/appError.js";

export const initApp = (app, express) => {
  const port = process.env.port || 5000;
  app.use(express.json());

  connectionDB();

  app.use("/users", routers.userRouter);
  app.use("/account", routers.accountRouter);

  app.use("*", (req, res, next) => {
    const err = next(new appError("page not found", 404));
    next(err);
  });

  app.use(globalErrorHandel);

  app.listen(port, () => console.log(`app listening on port ${port}!`));
};
