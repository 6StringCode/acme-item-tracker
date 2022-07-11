import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { faker } from '@faker-js/faker';


const Users = ({ users, things, createUser, deleteUser, removeThingFrUser })=> {
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
                <ul>
                  { 
                    things.filter(thing => thing.userId === user.id)
                      .map(thing => {
                        return (
                          <li key={ thing.id }>
                            { thing.name } ({ thing.ranking })
                            <button onClick={()=> removeThingFrUser(thing)}>x</button>
                          </li>
                        );
                      })
                  }
                </ul>
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
    users: state.users,
    things: state.things
  };
}

const mapDispatch = (dispatch)=> {
  return {
    createUser: async()=> {
      const user = (await axios.post('/api/users', {name: faker.name.firstName()})).data;
      dispatch({ type: 'CREATE_USER', user });
    },
    deleteUser: async(user)=> {
      await axios.delete(`/api/users/${user.id}`);
      dispatch({ type: 'DELETE_USER', user });
    },
    removeThingFrUser: async(thing)=> {
      const updatedThing = (await axios.put(`/api/things/${thing.id}`)).data;
      dispatch({ type: 'UPDATE_THING', thing: updatedThing });
    }
  }
}
export default connect(mapStateToProps, mapDispatch)(Users);
