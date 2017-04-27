'use strict';
const Immutable = require('immutable');
const lodash = require('lodash');
const chai = require('chai');
const expect = chai.expect;

class Todo {
	constructor(title, text, completed){
		this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		this.title = title;
		this.text = text;
		this.items = Immutable.List();
		this.completed = completed;
	}
}
function generateTodos(){
	let todos = Immutable.OrderedMap();
	lodash.forEach(lodash.range(100), index =>{
		const todo = new Todo(`Todo ${index}`, 'I am Todo!', false);
		
		lodash.forEach(lodash.range(Math.floor(Math.random()*100)), index =>{
			todo.items = todo.items.push(`Item ${index}`);
		});
		todos = todos.set(todo.id, todo);
	});
	return todos;
}
function sortByNumberOfItems(todoA, todoB){
	if(todoA.items.size > todoB.items.size)
		return -1;
	else if(todoA.items.size < todoB.items.size)
		return 1;
	
	return 0;
}
function insertAt(todos, todo, index){
	let firstHalf = todos.slice(0, index-1).push(todo.id,todo);
	let secondHalf = todos.slice(index);
	return firstHalf.concat(secondHalf);
}
describe('Maintaing order in immutbale js objects', () => {
	it('should sort items by descending order',() => {
		const todos = generateTodos().sort(sortByNumberOfItems);
		let lastTodo = null;
		let isDescendingTrue = todos.every(todo => {
			let isGreatorThanEqualTo = lodash.isNull(lastTodo) || 
								lastTodo.items.size >= todo.items.size;
			lastTodo = todo;
			return isGreatorThanEqualTo;
		});
		expect(isDescendingTrue).to.be.true;
	});
	it('should sort items by ascending order', () => {
		const todos = generateTodos().sort(sortByNumberOfItems).reverse();
		let lastTodo = null;
		let isAscendingTrue = todos.every(todo => {
			let isLessThanEqualTo = lodash.isNull(lastTodo) || lastTodo.items.size <= todo.items.size;
			lastTodo = todo;
			return isLessThanEqualTo;
		});
		expect(isAscendingTrue).to.be.true;
	});
	it('insert at a particular position', () =>{
		const item1 = new Todo('Todo1', 'I am Todo!', false);
		const item2 = new Todo('Todo2', 'I am Todo!', false);
		const item3 = new Todo('Todo3', 'I am Todo!', false);
		const item4 = new Todo('Todo4', 'I am Todo!', false);
		const item5 = new Todo('Todo5', 'I am Todo!', false);
		const item6 = new Todo('Todo6', 'I am Todo!', false);

		let immuatbleListTodos = Immutable.List.of(item1, item2, item3, item4, item5);
		expect(immuatbleListTodos.get(3).id).to.equal(item4.id);
		immuatbleListTodos = insertAt(immuatbleListTodos, item6, 3);
		//console.log(immuatbleListTodos);
		expect(immuatbleListTodos.get(3).id).to.equal(item6.id);
	});
	it('Check for space', () => {
		const x = ' lipsa';
		expect(x.indexOf(' ')).to.equal(0);
	});
});