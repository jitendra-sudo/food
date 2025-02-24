import {Schema, model} from "mongoose";
const userschema=new Schema({
    name: {
        type: String,
        required: true
      },
      username: {
        type: String,
        required: true,
        unique: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      }
    }, { timestamps: true });

    const user=model("user",userschema)
    export{user}