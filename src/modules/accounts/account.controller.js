import accountModel from "../../../DB/models/account.model.js";
import transactionModel from "../../../DB/models/transaction.model.js";
import userModel from "../../../DB/models/user.model.js";

import { asyncHandler } from "../../middleware/errorHandle.js";
import { appError } from "../../utils/appError.js";

export const createAcc = asyncHandler(async (req, res, next) => {
  const { user, creditMoney } = req.body;

  const userExist = await userModel.findOne({ _id: user });
  if (!userExist) {
    return next(new appError("user not exist", 400));
  }

  const accountExist = await accountModel.findOne({ _id: user });
  if (accountExist) {
    return next(new appError("account already exist", 401));
  }

  const account = await accountModel.create({ user, creditMoney });
  return res.status(200).json({ msg: "done", account });
});

export const deposit = asyncHandler(async (req, res, next) => {
  const { user, amount } = req.body;

  const accountExist = await accountModel.findOne({ _id: user });
  if (!accountExist) {
    return next(new appError("account not exist", 401));
  }

  accountExist.creditMoney += amount;
  accountExist.save();

  const transaction = await transactionModel.create({
    user,
    account: accountExist._id,
    operation: "deposit",
  });

  return res.json({ msg: "done", transaction });
});

export const withdraw = asyncHandler(async (req, res, next) => {
  const { user, amount } = req.body;

  const accountExist = await accountModel.findOne({ _id: user });
  if (!accountExist) {
    return next(new appError("account not exist", 401));
  }

  accountExist.creditMoney -= amount;
  accountExist.save();

  const transaction = await transactionModel.create({
    user,
    account: accountExist._id,
    operation: "withdraw",
  });

  return res.json({ msg: "done", transaction });
});

export const getBalance = asyncHandler(async (req, res, next) => {
  const { user } = req.params;
  const accountExist = await accountModel.findOne({ _id: user });
  if (!accountExist) {
    return next(new appError("account not exist", 401));
  }
  return res.json({ balance: accountExist.creditMoney });
});

export const getTransaction = asyncHandler(async (req, res, next) => {
  const { user } = req.params;
  const accountExist = await accountModel
    .findOne({ _id: user })
    .populate("transaction");
  if (!accountExist) {
    return next(new appError("account not exist", 401));
  }
  return res.json({ balance: accountExist.transaction });
});
