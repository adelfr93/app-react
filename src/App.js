import React, { useEffect, useState } from 'react';
import './App.css';

const App = () => {

  const [todos, setTodos] = useState([
    {id : 1, title : "HTML"},
    {id : 2, title : "CSS"},
    {id : 3, title : "JAVASCRIPT"},
    {id : 4, title : "REACT"},
  ]);
  const [input, setInput] = useState("");
  const [classInput, setClassInput] = useState(["form-control"]);
  const [classAlert, setClassAlert] = useState(["toast","d-none"]);


  useEffect(()=>{
    console.log(classAlert);
  }, [todos]);

  const handleDelete = (todo) => {
    let todos2 = todos.filter(t => todo.id !== t.id);
    setTodos(todos2);
  }
  const handleChange = (e) => {
    setInput(e.target.value);
  }
  const addClassInput = (newClass) => {
    const listClass = classInput.filter(c => c !== newClass);
    setClassInput([...listClass,newClass]);
  }
  const removeClassInput = (removeClass) => {
    setClassInput(classInput.filter(c => c !== removeClass ));
  }
  const addClassAlert = (newClass) => {
    const listClass = classAlert.filter(ca => ca !== newClass);
    setTimeout(() => {
      setClassAlert([...listClass,newClass]);
    }, 5000);
  }
  const removeClassAlert = (removeClass) => {
    setTimeout(() => {
      setClassAlert(classAlert.filter(ca => ca !== removeClass ));
  }, 5000);
  }
  const addTodo = (input) => {
    
    if(input === ''){
      addClassInput("help");
      return false
    }else{
      removeClassInput("help");
    }

    const newId = todos.length + 1;
    const newTitle = input;
    const newItem = {id : newId, title : newTitle};

    setTodos([...todos, newItem]);

    addClassAlert("show");
    removeClassAlert("d-none");

  }

  return ( <div className="container pt-5">
      <h1>React js</h1>

        <div className={classAlert.map(c => c).join(' ')} role="alert" aria-live="assertive" aria-atomic="true" style={{position: "absolute", bottom: 0, right: 0}} >
          <div className="toast-header">
            <strong className="mr-auto">Succes</strong>
            <small>11 mins ago</small>
            <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="toast-body">
            Hello, world! This is a toast message.
          </div>
        </div>


      <div className="col-md-12 my-4 form-group row px-0">
        <div className="col-md-6">
          <input type="text" name="input" placeholder='Tapez votre texte' className={classInput.map(c => c).join(' ')} onChange={(e) => handleChange(e)} />
        </div>
        <div className='col-md-6'>
          <button className='btn btn-primary btn-add' onClick={() => addTodo(input)}>Save</button>
        </div>
      </div>
      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Title</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} onDelete={() => handleDelete(todo)} />
      })}
      </tbody>
    </table>
    </div>);
}
 
const Todo = (props) => {
  return ( 
        <tr key={props.todo.id}>
          <th scope="row">{props.todo.id}</th>
          <td>{props.todo.title}</td>
          <td>
            <button onClick={props.onDelete} className="btn btn-danger btn-sm m-2" >Delete</button>
          </td>
        </tr>
 );
}


export default App;


