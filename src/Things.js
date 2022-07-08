import React from 'react';
import ThingForm from './ThingForm';
import { connect } from 'react-redux';
import axios from 'axios';

const Things = ({ things, deleteThing, changeRanking })=> {
  return (
    <div>
      <h1>Things</h1>
      <ul>
        {
          things.map( thing => {
            return (
              <li key={ thing.id }>
                { thing.name } ({ thing.ranking })
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
      things: state.things
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
        console.log(thing)
        dispatch({ type: 'CHANGE_RANKING', thing });
      }
    };
  }
)(Things);
