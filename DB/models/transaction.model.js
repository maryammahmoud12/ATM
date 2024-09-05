import { Schema, model } from "mongoose";

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "account",
  },
  operation: {
    type: String,
    enum: ["deposit", "withdraw"],
  },
});

const transactionModel = model("transaction", transactionSchema);
export default transactionModel;
