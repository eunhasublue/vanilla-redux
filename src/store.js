// redux를 사용하기 위해서는 우선적으로 store.js를 src 폴더 안에 만들어야 한다.
import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

export const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

export const deleteToDo = (id) => {
  return {
    type: DELETE,
    id,
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE:
      return state.filter((toDo) => toDo !== action.id);
    default:
      return state;
  }
};

const store = createStore(reducer);

// 변경사항을 알려줌
// 변화가 일어나면 어플리케이션을 다시 render하고 싶음 -> 변화가 일어난 부분과 함께
// 리액트는 변화가 있는 부분만 리렌더링해줌
// subscribe()를 하기 위해서는 redux-react가 필요한 시점임
// store의 변동사항에 대해 subscribe 하고 싶고, 그리고 걔들이 바뀔때, 모든게 다시 render 되기를 원함
// store.subscribe();

export default store;

// redux state로부터 정보를 가지고 올 수 있어야함
//
