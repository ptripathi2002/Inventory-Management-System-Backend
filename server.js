const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const app = express();
const path = require("path");
//MiddleWares

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://inventory-manager-webapp.vercel.app"],
    credentials: true,
  })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//Route Middleware

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactUs", contactRoute);

//Routes

app.get("/", (req, res) => {
  res.send("This is Working Fine-Home Page");
});

//Error Middleware
app.use(errorHandler);

//Connect to MONGODB and Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
