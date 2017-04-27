"use strict";
let Immutable = require('Immutable');
let chai = require('chai');
let expect = chai.expect;

class Todo {
	constructor(title, text, completed){
		this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		this.title = title;
		this.text = text;
		this.completed = false;
	}
}
function addTodo(todos, todo){
	return todos.set(todo.id, todo);
}
function removeTodo(todos, todo){
	return todos.delete(todo.id,todo);
}
function updateTodo(todos, todo){
	return todos.update(todo.id, todo => todo);
}
function mergeTodos(todos, todos2){
	return todos.merge(todos2);
}
function clearAll(todos){
	return todos.clear();
}
describe('Modfying an Immutable JS ', () => {
	it('should add todo to state', () => {
		const todo = new Todo('Todo 1', 'I am a Todo', false);
		let todos = Immutable.Map();
		todos = addTodo(todos, todo);
		expect(todos.get(todo.id)).to.equal(todo);
	});
	it('Remove a todo from state', () => {
		let todos = Immutable.Map();
		let todo = new Todo('Todo 1', 'I am a Todo', false);
		todos = addTodo(todos, todo);
		todos = removeTodo(todos, todo);
		expect(todos.get(todo.id)).to.not.equal(todo);
	});
	it('should update the todo correctly', () => {
		let todos = Immutable.Map();
		let todo = new Todo('Todo 1', 'I am a Todo', false);
		todos = addTodo(todos, todo);
		todo.title = 'New Title';
		todos = updateTodo(todos, todo);
		expect(todos.get(todo.id).title).to.equal('New Title');
	});
	it('Remove todos ', () => {
		let todos = Immutable.Map();
		for(let i = 0; i< 10; i++){
			todos = addTodo(todos, new Todo('Todo '+ i, 'I am a Todo', false));
		}
		todos = clearAll(todos);
		expect(todos.size).to.equal(0);

	});
	it('Merge 2 todos', () => {
		let todos = Immutable.Map();
		let todos2 = Immutable.Map();
		for(let i = 0; i< 10; i++){
			todos = addTodo(todos, new Todo('Todo '+ i, 'I am a Todo', false));
		}
		for(let i = 0; i< 10; i++){
			todos2 = addTodo(todos2, new Todo('Todo '+ i, 'I am a Todo', false));
		}
		todos = mergeTodos(todos, todos2);
		expect(todos.size).to.equal(20);
	});
});