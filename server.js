// packages imports
import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";

//files imports
import connectDB from "./config/db.js";

//routes import
import authRoutes from "./routes/authRoutes.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

//Dot ENV config
dotenv.config();

//mongodb connection  
connectDB();

//rest object
const app = express();

//middelwares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
// app.get("/", (req, res) => {
//   res.send("Server is running...");
// });

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);

//validation middleware
app.use(errorMiddleware);

//port
const PORT = process.env.PORT || 4000;

//listen
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.NODE_ENV} Mode on port no ${PORT}`
      .bgCyan.white
  );
});
