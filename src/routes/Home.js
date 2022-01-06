import React, { useState } from "react";
import { connect } from "react-redux";
import ToDo from "../components/ToDo";
import { actionCreators, add } from "../store";

// 2 ownProps : component의 props (여기선 Home) : by react-router의해서
//   - Home에게 준 props들
// mapDispatchToProps() 함수에서 dispatch를 인수로 가지기 때문에, Home.js에서도 dispatch를 기입해야 한다.
function Home({ toDos, addToDo }) {
  const [text, setText] = useState("");

  function onChange(e) {
    setText(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    addToDo(text);
    setText("");
  }

  return (
    <>
      <h1>TODO LIST</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange} />
        <button>Add</button>
      </form>
      {/* 
        todo들을 렌더링 해주는건 Home.js의 <ul> 이다.
        그래서 Home 에서 store로부터 state를 가져올 수 있어야 함.     
      */}
      <ul>
        {/*
          mapStateToProps로부터 받아온 toDos
        */}
        {toDos.map((toDo) => (
          <ToDo {...toDo} key={toDo.id} />
        ))}
      </ul>
    </>
  );
}

// store.js로부터 store를 Home.js에 state를 가져옴
// mapStateToProps(state, ownProps?) -> 여기선 getCurrentState()
// 1. state : redux store.js로부터 state를 받아옴 (reducer)
// 2 ownProps : component의 props (여기선 Home) : by react-router의해서
//   - Home에게 준 props들
// 3. 이 함수를 쓴다는 것은 redux store로부터 무엇인가를 가져오기 위해서
// 즉, Redux state로부터 <Home> 컴포넌트에 props를 전달하는 것임
function mapStateToProps(state) {
  // return 하면 리턴값이 <Home> 컴포넌트의 props에 추가됨
  return { toDos: state };
}

// 어떻게하면 컴포넌트가 dispatch 동작도 할것인지는 아래 함수
// mapDispatchToProps()
// 1. 이 함수는 connect()의 2번째 인수
//     - connect(mapStateToProps, mapDispatchToProps)는 2개의 인수를 가짐
// 2. 만약에, mapStateToProps가 필요하지 않는 경우는 아래 참조
//     - connect(null, mapDispatchToProps) -> null로 표기
// 3. mapDispatchToProps(dispatch, ownProps) 함수는 2개의 인수를 가짐
// 4. Home({dispatch})와 onSumit 에서 dispatch(addToDo(text)); 써줌으로써
//    mapDispatchToProps() 에서 props를 바꿀 수 있는 힘이 생김 -> Home에서
function mapDispatchToProps(dispatch) {
  return {
    // dispatch를 호출하는 것
    // addToDo는 text를 인수로 필요하고, 이 함수가 dispatch를 호출
    // addToDo: (text) => dispatch(actionCreators.addToDo(text)),

    //createSlice
    addToDo: (text) => dispatch(add(text)),
  };
}

// Connect
// 컴포넌트들을 store에 연결 시켜줌 (store와 컴포넌트 연결)
// connect는 state, dispatch 2개의 인수를 가짐 -> 이유 : 둘 중에 고를수 있기 때문
// store를 dispatch하기를 원하는지 아니면 store에서 getState 하기를 원하는지
// getState()는 state를 전달해주고, dispatch는 state 혹은 reducer에 메시지를 전달해줌
// connect()는 Home으로 보내는 props에 추가될 수 있도록 허용해줌
export default connect(mapStateToProps, mapDispatchToProps)(Home);
