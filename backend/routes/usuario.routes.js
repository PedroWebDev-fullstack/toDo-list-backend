import { Router } from "express";
import { cadastrarUsuario, logarUsuario, estaLogado, fazerLogout } from "../controllers/usuarios.controllers.js"

const usuariosRoutes = Router();

usuariosRoutes.post("/", cadastrarUsuario)
usuariosRoutes.post("/login", logarUsuario)
usuariosRoutes.get("/perfil", estaLogado)
usuariosRoutes.post("/logout", fazerLogout)

export default usuariosRoutes;