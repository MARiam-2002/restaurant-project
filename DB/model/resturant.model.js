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
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    logo: {
      id: {
        type: String,
        required: true,
        default:"1235"
      },
      url: {
        type: String,
        required: true,
        default:"https://res.cloudinary.com/dz5dpvxg7/image/upload/v1698085841/resturant/popularItems/aik0vim0sit6aclz1led.png"
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
