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
describe('Modfying an Immutable JS ', () => {
	it('should add todo to state', () => {
		const todo = new Todo('Todo 1', 'I am a Todo', false);
		let todos = Immutable.Map();
		todos = addTodo(todos, todo);
		expect(todos.get(todo.id)).to.equal(todo);
	});
});