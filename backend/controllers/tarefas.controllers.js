import pool from "../db.js";

const mostrarTarefas = async (req, res) => {
    try {
        if (!req.session.usuario) {
          return res.status(401).json({ erro: "Não autenticado" });
        }

        const idUsuario = req.session.usuario.id;
        
        const result = await pool.query('SELECT * FROM tarefas WHERE "idUsuario" = $1', [idUsuario]);

        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json(error);
    };
};

const adicionarTarefa = async (req, res) => {
    try {
        if (!req.session.usuario) {
          return res.status(401).json({ erro: "Não autenticado" });
        }

        const idUsuario = req.session.usuario.id;
        let { descricao, estaFeita } = req.body;
        estaFeita = Boolean(estaFeita);

        if (!descricao) {
            return res.status(400).json({ erro: "Descrição obrigatória" });
        }
        

        await pool.query('INSERT INTO tarefas ("idUsuario", descricao, "estaFeita") VALUES ($1, $2, $3)', [idUsuario, descricao, estaFeita]);

        res.status(201).json({
            sucesso: true,
            texto: "Nova tarefa adicionada.",
            descricao: descricao
        });
    } catch (error) {
        res.status(500).json(error);
    };
};

const alterarConclusao = async (req, res) => {
    try {
        if (!req.session.usuario) {
          return res.status(401).json({ erro: "Não autenticado" });
        }

        const idUsuario = req.session.usuario.id;
        let { id, estaFeita } = req.body;
        estaFeita = Boolean(estaFeita);

        await pool.query('UPDATE tarefas SET "estaFeita" = $1 WHERE id = $2 AND "idUsuario" = $3', [estaFeita, id, idUsuario]);

        res.status(200).json({
            sucesso: true,
            texto: estaFeita ? "Tarefa concluida" : "Tarefa pendente"
        });
    } catch (error) {
        res.status(500).json(error);
    };
};

const filtrarTarefas = async (req, res) => {
    try {
        if (!req.session.usuario) {
          return res.status(401).json({ erro: "Não autenticado" });
        };

        const idUsuario = req.session.usuario.id;
        let { estaFeita } = req.query;
        estaFeita = Boolean(estaFeita);
        
        const result = await pool.query('SELECT * FROM tarefas WHERE "idUsuario" = $1 AND "estaFeita" = $2', [idUsuario, estaFeita]);
        res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json(error);
    };
};

const deletarTarefa = async (req, res) => {
    try {
        if (!req.session.usuario) {
          return res.status(401).json({ erro: "Não autenticado" });
        }
        
        const idUsuario = req.session.usuario.id;
        const id = req.params.id;
        await pool.query('DELETE FROM tarefas WHERE id = $1 AND "idUsuario" = $2', [id, idUsuario]);
        res.status(200).json({ sucesso: true })
    } catch (error) {
        res.status(500).json(error);
    }
}

export { mostrarTarefas, adicionarTarefa, alterarConclusao, filtrarTarefas, deletarTarefa };