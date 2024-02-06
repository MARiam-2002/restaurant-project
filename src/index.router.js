import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import foodRouter from "./modules/food/food.router.js";
import mealRouter from "./modules/meal/meal.router.js";
import bestFoodRouter from "./modules/bestFood/bestFood.router.js";
import popularItemsRouter from "./modules/popularItems/popularItems.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import pass from "../config/passport.stupp.js";
import session from "express-session";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";

const initApp = (app, express) => {
  if (process.env.MOOD == "DEV") {
    app.use(morgan("common"));
  }
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
  app.use(cors());
  //convert Buffer Data
  app.use(express.json());
  app.use(session({ secret: "secret", resave: true, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());
  //Setup API Routing
  app.use(`/auth`, authRouter);
  app.use("/food", foodRouter);
  app.use("/meal", mealRouter);
  app.use("/bestFood", bestFoodRouter);
  app.use("/popularItems", popularItemsRouter);
  app.all("*", (req, res, next) => {
    res.send("In-valid Routing Plz check url  or  method");
  });
  app.use(globalErrorHandling);

};

export default initApp;
