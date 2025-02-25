import { Schema, model } from "mongoose";

const FavouriteSchema = new Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "food"
  }
});

export const fav = model("favourite", FavouriteSchema);
