import React from 'react';
import { connect } from 'react-redux'
import {addTodo, changeTodo, deleteTodo, fetchTodos} from "../../store/actions/todoActions";
import {refreshToken} from "../../store/actions/loginActions";
import '../../Container/todos.css'

class Index extends React.Component {

    state = {
        todos: null,
        token: localStorage.getItem('_todo:access'),
        text: '',
        modal: false,
        changeText: '',
        changeId: null,
        user: JSON.parse(localStorage.getItem('_todo:user'))
    }

    async componentDidMount() {
        if(!this.state.token){
            window.location.pathname = '/login'
        }else{
            const todos = await this.props.fetchTodos();
            this.setState({ todos: todos.results })
            const res = await this.props.refreshToken()
            if(res){
                this.props.fetchTodos();
            }
        }
    }

    inputHandler = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    addTodoHandler = async () => {
        const res = await this.props.addTodo({
            username: this.state.user.username,
            text: this.state.text,
            status: 0,
            email: this.state.user.email
        })

        this.setState({
            todos: [...this.state.todos, res],
            text: ''
        })
    }

    deleteTodoHandler = async (id) => {
        await this.props.deleteTodo(id)
        this.setState({
            todos: this.state.todos.filter(todo => todo.id !== id),
        })
    }

    showModal = (id) => {
        this.setState({modal: true, changeId: id})
    }

    closeModal = () => {
        this.setState({modal: false})
    }

    changeTodoHandler = async () => {
        const res = await this.props.changeTodo(this.state.changeId, {
            text: this.state.changeText,
            username: this.state.user.username,
            email: this.state.user.email,
            status: 0
        })

        const index = this.state.todos.findIndex(todo => todo.id === this.state.changeId)
        const oldTodos = [...this.state.todos]
        oldTodos[index] = res
        this.setState({ todos: oldTodos })
        this.closeModal()
    }

    render() {
        return (
            <div className='todoContainer'>
                { this.state.modal ? (
                    <div className="modal">
                        <div className="block">
                            <input type="text" name="changeText" onChange={(e) => this.inputHandler(e)}/>
                            <div>
                                <button onClick={this.changeTodoHandler}>change</button>
                                <button onClick={this.closeModal}>close</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <></>
                )}
                <h3>Todo List</h3>
                <div className='todos'>
                    { this.state.todos && this.state.todos.map(item => (
                        <li key={item.id}>
                            <p>{item.username}</p>
                            <b><p>{ item.text }</p></b>
                            <div>
                                <button className="edit_todo" onClick={() => this.showModal(item.id)}>
                                    edit
                                </button>
                                <button onClick={() => this.deleteTodoHandler(item.id)} className="delete_todo">
                                    delete
                                </button>
                            </div>
                        </li>
                    )) }
                </div>
                <div className="form_add">
                    <input
                        type="text"
                        value={this.state.text}
                        name='text'
                        placeholder='Text'
                        onChange={(e) => this.inputHandler(e)}
                    />

                    <button onClick={this.addTodoHandler}>
                        ok
                    </button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    history: state.history,
    todoList: state.todo,
    user: state.user.user
})

const mapDispatchToProps = (dispatch) => ({
    fetchTodos: () => dispatch(fetchTodos()),
    refreshToken: () => dispatch(refreshToken()),
    addTodo: (todo) => dispatch(addTodo(todo)),
    deleteTodo: (id) => dispatch(deleteTodo(id)),
    changeTodo: (id, todo) => dispatch(changeTodo(id, todo))
})

export default connect(mapStateToProps, mapDispatchToProps)(Index);