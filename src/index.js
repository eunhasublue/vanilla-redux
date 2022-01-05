import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// 아래 두개 함수는 그저 객체를 return하는 것 뿐.
// 이 return된 객체는 dispatch를 위해 이용됨
const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};

// redux에서 가장 중요함!!!
// 그리고 다른 것은 절대 state를 mutate하지 말아야 함
// mutate 즉, 기본 배열의 데이터를 해치지 않고, 새로운 객체, 새로운 state를 리턴해야 함.
// state를 수정하는 것이 아닌, 새로운 것을 return 하는 것임
const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [{ text: action.text, id: Date.now() }, ...state];
    case DELETE_TODO:
      // TODO를 삭제한다는 말은 그 TODO를 제외하고 싶다는 뜻
      // TODO를 유지 시킨다...즉, 삭제할 TODO의 ID에 해당하지 않는 TODO들을
      // 삭제하려고 하는 todo의 id를 가지지 않는 todo들을
      return state.filter((toDo) => toDo.id !== action.id);
    default:
      return;
  }
};

// store 즉 state를 수정할 수 있는 유일한 방법은 action을 보내는 것임
const store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

// 아래 함수는 오로지 action을 dispatch하기 위한 용도
const dispatchAddToDo = (text) => {
  // type만 보내는 것이 아니고, 어떤 내용을 보낼 것인지에 대한 것도 인수로 추가할 수 있다.
  store.dispatch(addToDo(text));
};

// 아래 함수는 오로지 action을 dispatch하기 위한 용도
const dispatchdeleteToDo = (e) => {
  // html로부터 받아오는 id는 string 형태
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(deleteToDo(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText = "DEL";
    btn.addEventListener("click", dispatchdeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

// const createTodo = (toDo) => {
//   const li = document.createElement("li");
//   li.innerText = toDo;
//   ul.appendChild(li);
// };

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  input.value = "";
  // createTodo(toDo);
  dispatchAddToDo(toDo);
};

form.addEventListener("submit", onSubmit);
