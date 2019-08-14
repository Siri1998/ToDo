import React, { Component } from 'react';
import './App.css';
import Item from "./Item";
import todosData from "./todos-data";
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: todosData,
            isCompletedState: 'all',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTodoChange = (todo) => {
        const todos = this.state.todos.map(item => {
            if (item.id === todo.id) {
                return todo;
            }
            return item;
        });

        this.setState(state => ({
            ...state,
            todos
        }));
    }
    componentDidMount() {
        this.getAllTodo();
    }


    getAllTodo() {
        axios('https://8j1j8j187d.execute-api.eu-central-1.amazonaws.com/staging/todos').then(({ data: todos }) => {
            console.log(todos)
            this.setState(state => ({
                ...state,
                todos
            }));
        })
    }

    handleSubmit() {

        if (this.newTodo.value) {

            axios.post('https://8j1j8j187d.execute-api.eu-central-1.amazonaws.com/staging/todos', {
                "id": this.getRandomId(),
                "text": this.newTodo.value,
                "completed": false
            }).then(response => {
                this.setState({
                    todos: [
                        ...this.state.todos,
                        response.data
                    ]
                })
            }).catch(function(error) {
                console.log('sadasd')
            });
            // let list = {
            //     "id": this.getRandomId(),
            //     "text": this.newTodo.value,
            //     "completed": false
            // }

            // let todos = [...this.state.todos, list];

            // this.newTodo.value = '';
            // this.setState({ todos });
            // this.createTodo(list);
        }
    }

    getRandomId() {
        return Math.floor(1 + Math.random() * 10000);
    }

    setCompletedState = type => {
        this.setState({ isCompletedState: type })
    }

    render() {
        console.log('0', this.state.todos)

        const todoItems = this.state.todos.filter(todo => {
            return this.state.isCompletedState === 'all' ||
                (this.state.isCompletedState === 'complated' && todo.completed) ||
                (this.state.isCompletedState === 'incomplated' && !todo.completed)
        }).map(todo => {
            return (
                <Item
                    key={todo.id}
                    todo={todo}
                    handleChange={this.handleTodoChange}
                />
            );
        })

        return (
            <div className="todo-list">
                <input type="text" ref={(ref) => this.newTodo = ref}/>
                <button className="icon-btn add-btn" onClick={this.handleSubmit}>
                    <div className="add-icon"></div>
                    <div className="btn-txt">Add</div>
                </button>
                {todoItems}
                <div className="panel green">
                  <button onClick={() => this.setCompletedState('complated')}> Complated </button>
                  <button onClick={() => this.setCompletedState('all')}> All </button>
                  <button onClick={() => this.setCompletedState('incomplated')}> Incomplated </button>
                </div>
            </div>
        );
    }
}

export default App;