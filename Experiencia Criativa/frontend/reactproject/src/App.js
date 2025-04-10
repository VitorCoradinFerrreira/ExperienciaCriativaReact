import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários', error);
    }
  };

  const onAddUser = async (newUser) => {
    try {
      const response = await axios.post('http://localhost:8800/api/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
    } catch (error) {
      console.error('Erro ao adicionar usuário', error);
    }
  };

  const onDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter(user => user.idusuarios !== id));
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
    }
  };

  const onEditUser = (user) => {
    setEditingUser(user);
  };

  const onUpdateUser = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:8800/api/users/${updatedUser.idusuarios}`, updatedUser);
      setUsers((prevUsers) => prevUsers.map(user => user.idusuarios === updatedUser.idusuarios ? updatedUser : user));
      setEditingUser(null);
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vitor Coradin Ferreira</h1>
        <h1>Gerenciamento de Usuários</h1>
        <UserForm onAddUser={onAddUser} editingUser={editingUser} onUpdateUser={onUpdateUser} />
        <UserList users={users} onDeleteUser={onDeleteUser} onEditUser={onEditUser} />
      </header>
    </div>
  );
}

export default App;
