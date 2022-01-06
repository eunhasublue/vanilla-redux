// redux를 사용하기 위해서는 우선적으로 store.js를 src 폴더 안에 만들어야 한다.
import { createStore } from "redux";
import {
  configureStore,
  createAction,
  createReducer,
  createSlice,
} from "@reduxjs/toolkit";

// Redux
// const ADD = "ADD";
// const DELETE = "DELETE";

// const addToDo = (text) => {
//   return {
//     type: ADD,
//     text,
//   };
// };

// const deleteToDo = (id) => {
//   return {
//     type: DELETE,
//     id: parseInt(id),
//   };
// };

// Redux Toolkit
// 아래 2개 변수의 리턴값은 텍스트임
// createAction()을 호출하면 리턴값으로 TYPE와 payload를 가짐
const addToDo = createAction("ADD");
const deleteToDo = createAction("DELETE");

/* const reducer = (state = [], action) => {
  switch (action.type) {
    case addToDo.type:
      // action은 type과 payload를 리턴하기 때문에
      // payload는 관행같은 것...redux toolkit이 제공하는 것
      // payload에 input text값이 들어감
      return [{ text: action.payload, id: Date.now() }, ...state];

    // case ADD:
    // 아래 return 값에서 action은 text가 아닌 type을 리턴하기 때문에, todo를 추가해도 브라우저에 출력이 안됨
    // return [{ text: action.text, id: Date.now() }, ...state];

    // case DELETE:
    case deleteToDo.type:
      // return state.filter((toDo) => toDo.id !== action.id);
      return state.filter((toDo) => toDo.id !== action.payload);
    default:
      return state;
  }
}; */

// [redux toolkit]
// createReducer()
// 1. 1번재 인수 : initalState
// 2. state를 변형하기 쉽게 만들어줌 (전 방법은 state를 새로 만들었음)
// 3. redux toolkit에서 변형해도 되는 이유는 Immer 아래에서 작동되기 때문
// 4. swtich case문을 쓸 필요 없게 해줌
// const reducer = createReducer([], {
//   [addToDo]: (state, action) => {
//     // 뭔가 return 할때는 새로운 state여야함.
//     // state.push는 아무것도 return하지 않음
//     // 단지, state를 변형할 뿐
//     // 만약 state를 변형하면 아무것도 리턴하지 않음
//     // 빈 배열에 새로운 toDo를 push 해줌
//     state.push({ text: action.payload, id: Date.now() }, ...state);
//   },
//   // createReducer() 작업할때 2가지 선택지가 있음
//   // 1. 새로운 state를 return 할 수 있음
//   // 2. state를 변형시킬 수 있음
//   [deleteToDo]: (state, action) =>
//     state.filter((toDo) => toDo.id !== action.payload),
// });

// createSlice
// 1. reducer와 action을 생성해줌
// 2. 몇 개의 옵션을 받음
const toDos = createSlice({
  name: "toDosReducer",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push({ text: action.payload, id: Date.now() });
    },
    remove: (state, action) =>
      state.filter((toDo) => toDo.id !== action.payload),
  },
});

// createSlice
const store = configureStore({ reducer: toDos.reducer });

// createSlice
export const { add, remove } = toDos.actions;

// const store = createStore(reducer);

// 아래 함수는 쿨한 미들웨어와 함께 store를 생성함
// Redux Dev Tool 사용 가능함
// const store = configureStore({ reducer });

// export const actionCreators = {
//   addToDo,
//   deleteToDo,
// };

// 변경사항을 알려줌
// 변화가 일어나면 어플리케이션을 다시 render하고 싶음 -> 변화가 일어난 부분과 함께
// 리액트는 변화가 있는 부분만 리렌더링해줌
// subscribe()를 하기 위해서는 redux-react가 필요한 시점임
// store의 변동사항에 대해 subscribe 하고 싶고, 그리고 걔들이 바뀔때, 모든게 다시 render 되기를 원함
// store.subscribe();

export default store;

// redux state로부터 정보를 가지고 올 수 있어야함
