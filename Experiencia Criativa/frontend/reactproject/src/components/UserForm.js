import React, { useState, useEffect } from 'react';

const UserForm = ({ onAddUser, onUpdateUser, editingUser }) => {
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [cpf, setCpf] = useState('');
  const [genero, setGenero] = useState('');
  const [nacionalidade, setNacionalidade] = useState('');
  const [id, setId] = useState(null);

  useEffect(() => {
    if (editingUser) {
      setNome(editingUser.nome || '');
      setIdade(editingUser.idade || '');
      setCpf(editingUser.cpf || '');
      setGenero(editingUser.genero || '');
      setNacionalidade(editingUser.nacionalidade || '');
      setId(editingUser.idusuarios || null);
    } else {
      resetForm();
    }
  }, [editingUser]);

  const resetForm = () => {
    setNome('');
    setIdade('');
    setCpf('');
    setGenero('');
    setNacionalidade('');
    setId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome.trim() || !idade || !cpf.trim() || !genero || !nacionalidade.trim()) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const user = { nome, idade, cpf, genero, nacionalidade };

    if (id) {
      onUpdateUser({ ...user, idusuarios: id });
    } else {
      onAddUser(user);
    }

    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <input
        type="number"
        placeholder="Idade"
        value={idade}
        onChange={(e) => setIdade(e.target.value)}
        min="0"
      />
      <input
        type="text"
        placeholder="CPF"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
      />
      <select value={genero} onChange={(e) => setGenero(e.target.value)}>
        <option value="">Selecione o gênero</option>
        <option value="Masculino">Masculino</option>
        <option value="Feminino">Feminino</option>
        <option value="Outro">Outro</option>
      </select>
      <input
        type="text"
        placeholder="Nacionalidade"
        value={nacionalidade}
        onChange={(e) => setNacionalidade(e.target.value)}
      />
      <button type="submit">{id ? 'Atualizar' : 'Adicionar'}</button>
    </form>
  );
};

export default UserForm;
