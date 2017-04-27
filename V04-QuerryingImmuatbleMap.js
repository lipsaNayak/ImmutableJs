"use strict";
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;

class Todo{
	constructor(title, text, completed){
		this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		this.title = title;
		this.text = text;
		this.completed = completed;
	}
}

function addTodo(todos, todo){
	return todos.set(todo.id, todo);
}

function findTodo(todos, todo){
	return todos.find((t)=>{
		return t.id === todo.id;
	}, null, null);
}

describe('Querrying immutable map', () => {
	it('should properly report keys', ()=> {
		const todo = new Todo('Todo 1', 'I am a Todo1!', false);
		let todos = Immutable.Map();
		todos = addTodo(todos, todo);
		expect(todos.get(todo.id)).to.equal(todo);
	});
	it('The has query method', () =>{
		const todo = new Todo('Todo 1', 'I am Todo!', false);
		let todos = Immutable.Map();
		todos = addTodo(todos, todo);
		expect(todos.has(todo.id)).to.equal(true);
		expect(todos.has('unknown_key')).to.equal(false);
	});
	it('includes query method', () => {
		const todo = new Todo('Todo 1', 'I am Todo!', false);
		let todos = Immutable.Map();
		todos = addTodo(todos, todo);
		expect(todos.includes(todo)).to.equal(true);
	});
	it(('getIn query function'), () => {
		let todos1 = Immutable.Map();
		let todos2 = Immutable.Map();
		for(let i = 0; i< 10; i++){
			todos1 = addTodo(todos1, new Todo('Todo'+i,'I am Todo', false))
		}
		for(let i = 0; i< 10; i++){
			todos2 = addTodo(todos2, new Todo('Todo'+i,'I am Todo', false))
		}
		const multipleTodos = Immutable.Map({
			'todos1' : todos1,
			'todos2' : todos2
		});
		const todoID = todos1.first().id;
		expect(multipleTodos.getIn(["todos1",todoID])).to.equal(todos1.first())
	});
	it('Find in immutable map', () => {
		let todos = Immutable.Map();
		const todo = new Todo('Todo1', 'I am todo', false);
		const todo2 = new Todo('Todo2', 'I am todo', false);
		todos = addTodo(todos, todo);
		todos = addTodo(todos, todo2);
		expect(findTodo(todos,todo)).to.equal(todo);
	});
});