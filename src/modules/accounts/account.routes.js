import { Router } from "express";
import { auth } from "../../middleware/auth.js";

import * as AC from "./account.controller.js";

const accountRouter = Router();

accountRouter.post("/createacc", auth(), AC.createAcc);
accountRouter.post("/deposit", auth(), AC.deposit);
accountRouter.post("/withdraw", auth(), AC.withdraw);
accountRouter.get("/balance", auth(), AC.getBalance);
accountRouter.get("/transaction", auth(), AC.getTransaction);

export default accountRouter;
