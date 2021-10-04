import { Schema, model } from "mongoose";
import { UserDef } from "./user";

const chatRoomSchema = new Schema({
  name: String,
  avatar: String,
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: {
    type: [
      {
        content: { type: String },
        sender: { type: Schema.Types.ObjectId },
        time: Number,
      },
    ],
  },
});

export type ChatRoomDef = {
  name: string;
  avatar: string;
  members: string[] | UserDef[];
  messages: { content: string; sender: string; time: number }[];
};

export const ChatRoom = model<ChatRoomDef>("ChatRoom", chatRoomSchema);
