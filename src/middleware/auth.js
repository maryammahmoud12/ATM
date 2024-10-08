import jwt from "jsonwebtoken";
import userModel from "../../DB/models/user.model.js";
import { appError } from "../utils/appError.js";

export const auth = () => {
  return async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
      return next(new appError("token not exist", 400));
    }
    if (!token.startsWith("aa__")) {
      return next(new appError("invalid bearer key", 401));
    }
    const newToken = token.split("aa__")[1];
    if (!newToken) {
      return next(new appError("invalid token", 403));
    }
    const decoded = jwt.verify(newToken, "aaaaa");
    if (!decoded?.email) {
      return next(new appError("invalid token payload", 404));
    }
    const user = await userModel.findOne({ email: decoded.email });
    if (!user) {
      return next(new appError("user not exist", 405));
    }
    req.user = user;
    next();
  };
};
