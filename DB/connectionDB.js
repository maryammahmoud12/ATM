import mongoose from "mongoose";

const connectionDB = async () => {
  return await mongoose
    .connect("mongodb://localhost:27017/ATM")
    .then(() => {
      console.log("connected to database success");
    })
    .catch((err) => {
      console.log("connected to database fail");
    });
};

export default connectionDB;
