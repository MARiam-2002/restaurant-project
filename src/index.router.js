import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import foodRouter from "./modules/food/food.router.js";
import mealRouter from "./modules/meal/meal.router.js";
import restaurantRouter from "./modules/restaurant/restaurant.router.js";
import bestFoodRouter from "./modules/bestFood/bestFood.router.js";
import popularItemsRouter from "./modules/popularItems/popularItems.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import cors from "cors";
import morgan from "morgan";

const initApp = (app, express) => {


  if (process.env.MOOD == "DEV") {
    app.use(morgan("common"));
  }
  app.use(cors());
  // const whiteList = ["http://127.0.0.1:5500",undefined];

  // app.use((req, res, next) => {
  //   if (req.originalUrl.includes("/auth/confirmEmail")) {
  //     res.setHeader("Access-Control-Allow-Origin", "*");
  //     res.setHeader("Access-Control-Allow-Methods", "GET");
  //     return next();
  //   }
  //   if (!whiteList.includes(req.header("origin"))) {
  //     return next(new Error("Blocked By CORS!"));
  //   }
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  //   res.setHeader("Access-Control-Allow-Headers", "*");
  //   res.setHeader("Access-Control-Allow-Methods", "*");
  //   res.setHeader("Access-Control-Allow-Private-Network", true);
  //   return next();
  // });
  //convert Buffer Data
  app.use(express.json());
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use("/food", foodRouter);
  app.use("/meal", mealRouter);
  app.use("/restaurant", restaurantRouter);
  app.use("/bestFood", bestFoodRouter);
  app.use("/popularItems", popularItemsRouter);
  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(globalErrorHandling);

  connectDB();
};

export default initApp;
