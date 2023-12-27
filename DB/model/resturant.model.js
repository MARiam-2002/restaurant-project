import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    offer: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Open Now", "Opens Tomorrow", "Close"],
      default: "Open Now",
    },
    image: {
      id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    logo: {
      id: {
        type: String,
      },
      url: {
        type: String,
        
      },
    },
    speed: {
      type: String,
      enum: ["Fast", "Slow", "Medium"],
      default: "fast",
    },
    review: {
      type: Number,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

const restaurantModel = model("Restaurant", restaurantSchema);
export default restaurantModel;
