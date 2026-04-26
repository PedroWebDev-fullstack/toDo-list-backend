import { Router } from "express";
import { mostrarTarefas, adicionarTarefa, alterarConclusao, filtrarTarefas, deletarTarefa } from "../controllers/tarefas.controllers.js"

const tarefasRoutes = Router();

tarefasRoutes.get("/", mostrarTarefas)
tarefasRoutes.post("/", adicionarTarefa)
tarefasRoutes.put("/", alterarConclusao)
tarefasRoutes.get("/filtrar", filtrarTarefas)
tarefasRoutes.delete("/:id", deletarTarefa)

export default tarefasRoutes;