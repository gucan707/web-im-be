import { Schema, model } from "mongoose";

const userSchema = new Schema({
  username: { type: String, unique: true },
  nickname: String,
  friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
  avatar: { type: String, default: "" },
  password: String,
});

export type UserDef = {
  username: string;
  nickname: string;
  friends: string[] | UserDef[];
  avatar: string;
  password: string;
};

export const User = model<UserDef>("User", userSchema);
