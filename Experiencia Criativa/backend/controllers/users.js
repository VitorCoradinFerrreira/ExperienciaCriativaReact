import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuarios";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
};

export const getUserById = (req, res) => {
    const q = "SELECT * FROM usuarios WHERE idusuarios = ?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json({ message: "Usuário não encontrado" });
        return res.status(200).json(data[0]);
    });
};

export const createUser = (req, res) => {
    const { nome, idade, cpf, genero, nacionalidade } = req.body;
    const q = "INSERT INTO usuarios (nome, idade, cpf, genero, nacionalidade) VALUES (?, ?, ?, ?, ?)";
    db.query(q, [nome, idade, cpf, genero, nacionalidade], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Usuário criado com sucesso!" });
    });
};

export const updateUser = (req, res) => {
    const { nome, idade, cpf, genero, nacionalidade } = req.body;
    const q = "UPDATE usuarios SET nome = ?, idade = ?, cpf = ?, genero = ?, nacionalidade = ? WHERE idusuarios = ?";
    db.query(q, [nome, idade, cpf, genero, nacionalidade, req.params.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    });
};

export const deleteUser = (req, res) => {
    const userId = req.params.id;
    console.log("Tentando excluir usuário com ID:", userId);
    
    const q = "DELETE FROM usuarios WHERE idusuarios = ?";
    
    db.query(q, [userId], (err, data) => {
        if (err) {
            console.error("Erro ao executar query:", err);
            return res.status(500).json(err);
        }
        
        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        
        return res.status(200).json({ message: "Usuário excluído com sucesso!" });
    });
};


