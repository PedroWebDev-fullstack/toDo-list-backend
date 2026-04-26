import bcrypt from "bcrypt";
import pool from "../db.js";

const cadastrarUsuario = async (req, res) => {
    try {
        const {nome, email, senha} = req.body;
        const senhaCriptografada = await bcrypt.hash(senha, 10)
        await pool.query("INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)", [nome, email, senhaCriptografada]);
        res.status(201).json({
            sucesso: true,
            nome: nome,
            email: email
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    };
};

const logarUsuario = async (req, res) => {
    try {
        const {email, senha} = req.body;

        
        const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        const usuario = result.rows[0];

        if (!usuario) {
            return res.json({ erro: "Email não encontrado" })
        }
        
        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.json({ erro: "Senha incorreta" })
        }

        req.session.usuario = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email
        }

        res.status(200).json({ sucesso: true })

    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

const estaLogado = (req, res) => {
    try {
        if (!req.session.usuario) {
            return res.status(401).json({ erro: "Não Autorizado" })
        }
        res.json(req.session.usuario)
    } catch (error) {
        console.error(error);
    }
    
};

const fazerLogout = async (req, res) => {
    req.session.destroy(() => {
        res.json({ sucesso: true })
    });
};

export {cadastrarUsuario, logarUsuario, estaLogado, fazerLogout};