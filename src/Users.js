import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';


const Users = ({ users, createUser, deleteUser })=> {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={ createUser }>Add User</button>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                { user.name }
                <button onClick={()=> deleteUser(user)}>x</button>
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

const mapStateToProps = (state)=> {
  return {
    users: state.users
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: async()=> {
      const user = (await axios.post('/api/users', {name: Math.random()})).data;
      //const user = (await axios.post('/api/users', {name: Math.random()})).data;
      dispatch({ type: 'CREATE_USER', user });
    },
    deleteUser: async(user)=> {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', user });
    }
  }
}
export default connect(mapStateToProps, mapDispatch)(Users);
