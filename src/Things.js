import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, users, deleteThing, changeRanking })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            const user = users.find(user => user.id === thing.userId) || {};
            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.ranking })
                owned by { user.name || 'nobody' }
                <button onClick={()=> changeRanking(thing, 1)}>+</button>
                <button onClick={()=> changeRanking(thing, -1)}>-</button>
                <button onClick={()=> deleteThing(thing)}>x</button>
              </li>
            );
          })
        }
      </ul>
      <ThingForm />
    </div>
  );
};

export default connect(
  (state)=> {
    return {
      things: state.things,
      users: state.users
    }
  },
  (dispatch)=>{
    return {
      deleteThing: async(thing)=> {
        await axios.delete(`/api/things/${thing.id}`);
        dispatch({ type: 'DELETE_THING', thing }); //this is for the store
      },
      changeRanking: async(thing, dir)=> {
        thing = {...thing, ranking: thing.ranking + dir}
        thing = (await axios.put(`/api/things/${thing.id}`, thing)).data;
        dispatch({ type: 'CHANGE_RANKING', thing });
      }
    };
  }
)(Things);
