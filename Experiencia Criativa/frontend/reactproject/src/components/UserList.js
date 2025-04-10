import React from 'react';

const UserList = ({ users, onDeleteUser, onEditUser }) => {
  return (
    <div>
      <h2>Lista de Usuários</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>CPF</th>
            <th>Gênero</th>
            <th>Nacionalidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.idusuarios}>
              <td>{user.nome}</td>
              <td>{user.idade} anos</td>
              <td>{user.cpf}</td>
              <td>{user.genero}</td>
              <td>{user.nacionalidade}</td>
              <td>
                <div className="action-buttons">
                  <button className="edit-button" onClick={() => onEditUser(user)}>
                    Editar
                  </button>
                  <button className="delete-button" onClick={() => onDeleteUser(user.idusuarios)}>
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;