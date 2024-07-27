import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    loginAttepmt: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    statics: {
      findUserWithEmail: async function (email: string) {
        await this.findOne({ email });
      },
      findUserWithId: async function (id: string) {
        await this.findById(id);
      },
    },
  }
);

const UserModel = model("User", userSchema);

export default UserModel;
