import './App.css';
import TodoLists from './components/TodoLists';
import Header from './components/Header';
import { createContext, useReducer } from 'react';



//사용할 상태 초기값 설정1
//초기상태를 컴포넌트 밖에 선언하기
const initialState = {
  input: "",
  todos: [
    {id: 1, text: "해야할일1", isDone: false},
    {id: 2, text: "해야할일2", isDone: false},
  ],
  id: 3
}

//reducer 함수선언2
function reducer(state, action){
  switch(action.type) {
    case "changeInput":
      return {
        ...state,
        input: action.payload   //action과 payload 우리가 만듬 
      };
    case 'addTodo':
      return {
        ...state,
        todos:[...state.todos, action.todo] ,
        id: state.id+1,
        input: ""
        //업데이트한 값들을 action으로 전달
      }
    case 'deleteTodo':
      return {
        ...state,
        todos: state.todos.filter(todo=> todo.id !== action.id)
      };
    case 'toggleTodo':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.id ? {...todo, isDone: !todo.isDone}
          : todo)
      }  
      default:
          return state;
  }
}

export const userDispatch = createContext(null);

function App() {
  //상태선언하기
  const [state, dispatch] = useReducer(reducer, initialState);
  const {todos, input, id} = state;
  //인풋값 업데이트 요청
  const onChange = (e) => {
    dispatch({
      type: 'changeInput',
      payload: e.target.value
    })
  }
  //할일항목 추가 업데이트 요청
  const addTodo = () => {
    dispatch({
      type: 'addTodo',
      todo: { id: id,text: input, isDone: false}
    })
  }
  //할일 항목 삭제 업데이트 요청
  const removeTodo = (id)=> {
    dispatch({
      type: "deleteTodo",
      id: id
    })
  }
  //리스트 색활성화 비활성화 요청
  const toggleTodo = (id)=> {
    dispatch({
      type: "toggleTodo",
      id: id
    })
  }
  return (
    <userDispatch.Provider value={dispatch}>
    <div className="App">
      <Header input={input} id={id}/>
      <TodoLists todos = {todos}/>
    </div>
    </userDispatch.Provider>
  );
}

export default App;
