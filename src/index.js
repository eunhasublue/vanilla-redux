import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

const ADD = "ADD";
const MINUS = "MINUS";

// count를 어떻게 수정할지
// 1. action을 인수로 보내기
//     - action은 redux에서 함수를 부를때, 쓰는 두번째 파라미터 or 인수
// 2. countModifier()와 소통하기 위한 방법인 action들이 있음
// 3. countModifier()에게 수정할 수 있게 하는 방법을 찾아야 함
//     - ex) count + 1 or count - 1 을 return 해야 함.
//     - 위의 계산은 action의 도움을 받아야함
// 4. countModifier() action을 보내는 방법
//     - countStore.dispatch()을 입력해서 action을 보낼 수 있음. -> () 안에 인수 입력(Object만 입력)
// 5. store, dispatch, action을 입력하면, redux가 countModifier() 부를거고

// const reducer = () => {};

// 어플리케이션의 데이터를 수정하고 싶으면 countModifier를 호출하면 되고
// state를 인자로 가지게 될거고,
// 유일하게 한 개의 함수만 데이터를 수정할 수 있고
// 데이터가 기본적으로 한 곳에만 있음
// store를 만들면, countModifier를 inital state로 불러옴
// 만약 state에 데이터가 없으면 default로 0이 됨 -> state 초기화(initializing)
const countModifier = (state = 0, action) => {
  // 리펙토링 코드
  switch (action.type) {
    case ADD:
      return state + 1;
    case MINUS:
      return state - 1;
    default:
      return state;
  }

  // before 코드
  // if (action.type === "ADD") {
  //   return state + 1;
  // } else if (action.type === "MINUS") {
  //   return state - 1;
  // } else {
  //   // return은 이 어플리케이션에 있는 데이터
  //   return state;
  // }
};

// 1. store 만들기
// 2. createStore라는 함수가 우리에게 reducer를 주기를 요구함.
// - reducer는 함수임!! (data를 수정하는 함수)
// const store = createStore(reducer);
const countStore = createStore(countModifier); //위코드를 아래 코드로 수정 변수 및 함수이름

const onChange = () => {
  number.innerText = countStore.getState();
};

// subscribe
// 1. 우리에게 store안에 있는 변화들을 알 수 있게 해줌
countStore.subscribe(onChange);

countStore.dispatch({ type: "ADD" });
countStore.dispatch({ type: "MINUS" });

add.addEventListener("click", () => countStore.dispatch({ type: ADD }));
minus.addEventListener("click", () => countStore.dispatch({ type: MINUS }));

// let count = 0;

// number.innerText = count;

// const updateText = () => {
//   number.innerText = count;
// };

// const handleAdd = () => {
//   count++;
//   updateText();
// };
// const handleMinus = () => {
//   count--;
//   updateText();
// };

// add.addEventListener("click", handleAdd);
// minus.addEventListener("click", handleMinus);

// store
// 1. data를 넣는 곳, 나의 state
// 2. 기본적으로 data를 넣을 수 있는 장소를 생성함
// 3. redux는 data를 관리 및 도와주는 역할을 하기 위해 만들어졌음.
// 4. 여기선 redux가 -1, +1을 count 하는 걸 도와주기 위해 만들어 진것임 - reducer
// 5. 우리는 데이터를 store라는 곳에 저장해야함.

// state
// 1. 어플리케이션에서 바뀌는 data를 말함.
// 2. 여기에선 count가 유일한 state

// 요약(Recap)
// countModifier(=reducer)는 현재 상태의 어플리케이션과 함께 불려지는 함수.
// action은 countModifier(=reducer)와 소통하는 함수
// countModifier(=reducer)가 return 하는 것은 어플리케이션의 state가 됨
// countModifier(=reducer)가 state, action이 함께 불려짐
// reducer에게 action을 보내는 방법 => dispatch가 reducer를 불러서 current state와 우리가 보낸 action을 더해
// - action 함수에 들어갈 인수 타입은 객체(Object)여야 함.
// - action은 속성으로 type이 있어야 하고, type 속성 이름이 바뀌면 안됨
// - atcion 은 countModifier(=reducer)와 소통하는 방법임
// 그리고 변화를 store에서 감지하고 싶으면 그 변화를 subscribe 하면 됨
