const express = require("express");
const mongoose = require("mongoose");
const app = express();
const eventsRoutes = require("./routes/eventsRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const verifyToken = require("./middlewares/verifyToken");

const PORT = 3000;

require("dotenv").config();

async function connectMongo() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("conectamos no mongo");
  } catch (error) {
    console.log("deu pau no mongo");
  }
}

connectMongo();

/* `app.use(express.json())` is a middleware function that parses incoming requests with JSON payloads.
It allows the server to handle JSON data sent in the request body. */

app.use(express.json());

app.use("/api/v1/events", eventsRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.send("informaçoes para listar algo");
// });

// app.post("/", (req, res) => {
//   res.send("informaçoes para gravar algo");
// });

// app.put("/", (req, res) => {
//   res.send("informaçoes para listar algo");
// });

// app.delete("/", (req, res) => {
//   res.send("informaçoes para atualizar algo");
// });

app.listen(PORT, () => {
  console.log("MINHA APLICAÇAO EXPRESS");
});
