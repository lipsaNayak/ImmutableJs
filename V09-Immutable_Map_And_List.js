'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;
const lodash = require('lodash');

class Todo{
	constructor(title, text, completed){
		this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		this.title = title;
		this.text = text;
		this.completed = completed;
	}
}
function addTodoMap(todos, todo){
	return todos.set(todo.id, todo);
}
function addTodoList(todos, todo){
	return todos.push(todo);
}
describe('Difference between immutable js Map and List', () => {
	it('Should find the same todo using map and List', () => {
		let todosMap = Immutable.Map();
		const todo = new Todo('Todo1', 'I am Todo', false);
		todosMap = addTodoMap(todosMap, todo);

		let todosList = Immutable.List();
		todosList = addTodoList(todosList, todo);

		expect(todosMap.get(todo.id)).to.equal(todo);
		expect(todosList.get(0)).to.equal(todo);
	});
	it('should create List from a set of values', () => {
		const array = ['Milk', 'Bread', 'Butter', 'Cheese', 'Tea'];
		//const immutableList = Immutable.List.of('Milk', 'Bread', 'Butter', 'Cheese', 'Tea');
		const immutableList = Immutable.List.of(...array);
		let count  = 0;
		lodash.forEach(array, todo => {
			expect(immutableList.get(count)).to.equal(todo);
			count++;
		})
	});
});
