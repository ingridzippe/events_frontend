const initialState = {
  email: ''
}

// Inside app/reducers/index.js
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EMAIL':
      // action.text EXISTS - it is your new email
      return Object.assign({}, state, {email: action.text});
    case 'ADD_TODO':
      // copy new state so no mutations to old state
      const newState = [ ...state ];
      // create the todo from the action object
      const newTodo = {
        id: action.id,
        task: action.task,
        completed: action.completed
      };
      // okay to mutate our own copy
      newState.push(newTodo);
      return newState
    case 'TOGGLE_TODO':
      //    newState[index].completed = !newState[index].completed
      //    const newState = [ ...state.slice(0, index), {}, ...state.slice(index+1, state.length) ];
      //    newState(action.id) = {};
      //    Object.assign(newState[action.id], {})
      //    newTodo[action.id.completed] = !newState[action.id.completed];
      //    return newState
      const newState2 = [...state];
      var tempObj = newState2[action.id];
    newState2[action.id] = Object.assign({}, newState2[action.id],{completed: !tempObj.completed});
    return newState2;
    case 'DELETE_TODO':
      const newState3 = state.map(
        (todo)=>(Object.assign({}, todo))
      )
      newState3.splice(action.id, 1);
      for(var i=action.id; i<newState3.length; i++) {
        newState3[i].id--;
      }
      return newState3;
    default:
      return state;
  }
};

export default reducer;
