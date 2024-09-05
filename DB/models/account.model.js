import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  creditMoney: {
    type: Number,
    default: 0,
  },
  amount: Number,
  transaction: {
    type: Schema.Types.ObjectId,
    ref: "transaction",
  },
});

const accountModel = model("account", accountSchema);
export default accountModel;
