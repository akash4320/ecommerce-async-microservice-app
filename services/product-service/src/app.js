const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "product-service",
  });
});

app.use("/products", productRoutes);

app.use(errorHandler);

module.exports = app;
