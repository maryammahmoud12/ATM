import jwt from "jsonwebtoken";
import userModel from "../../../DB/models/user.model.js";
import bcrypt from "bcrypt";

import { asyncHandler } from "../../middleware/errorHandle.js";
import { appError } from "../../utils/appError.js";

export const Register = asyncHandler(async (req, res, next) => {
  const { name, email, password, age, phone } = req.body;

  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(new appError("user already exist", 404));
  }

  const hash = bcrypt.hashSync(password, 8);

  const user = await userModel.create({
    name,
    email,
    password: hash,
    age,
    phone,
  });
  return res.status(201).json({ msg: "done", user });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new appError("user not found or invalid password", 205));
  }
  const token = jwt.sign({ email }, "aaaaa");
  await userModel.updateOne({ email }, { loggedIn: true });
  return res.status(206).json({ msg: "done", token });
});
