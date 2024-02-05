
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import initApp from "./src/index.router.js";
import connectDB from "./DB/connection.js";
const app = express();
// setup port and the baseUrl
const port = process.env.PORT || 5000;
initApp(app, express);
connectDB();

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
