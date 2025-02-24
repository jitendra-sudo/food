import {Schema,model} from "mongoose";

const RecipeSchema = new Schema(
    {
      title: { type: String, required: true },
      image: { type: String, required: true },
      summary: { type: String, required: true },
      nutrition: {
        nutrients: [
          {
            name: { type: String, required: true },
            amount: { type: Number, required: true },
            unit: { type: String, required: true }
          }
        ],
        ingredients: [{ type: String, required: true }]
      }
    },
    { timestamps: true }
  );

export const food=model("recepie", RecipeSchema);
