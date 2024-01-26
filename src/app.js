const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
require("dotenv").config();
const mongoURI = process.env.MONGO_DB;

mongoose
  .connect(mongoURI)
  .then(() => console.log("Conexión a MongoDB exitosa"))
  .catch((err) => console.error("Error al conectar a MongoDB:", err));

app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Algo salió mal!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
