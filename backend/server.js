import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import session from "express-session";
import usuariosRoutes from "./routes/usuario.routes.js";
import tarefasRoutes from "./routes/tarefas.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:5173", "https://todolists-swart.vercel.app"],
  credentials: true
}));

app.set("trust proxy", 1);

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "none"
  }
}));

app.use("/usuarios", usuariosRoutes);
app.use("/tarefas", tarefasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na url -> https://todo-list-backend-fznk.onrender.com:${PORT}`)
})
