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
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        httpOnly: true,
        sameSite: "lax"
    }
}));

app.use("/usuarios", usuariosRoutes);
app.use("/tarefas", tarefasRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na url -> http://localhost:${process.env.PORT}`)
})