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

//Conovience Methods
function addTodo(todos, todo){
	return todos.set(todo.id,todo);
}
//Test Methods
function getMappedTodos(todos){
	return todos.map(todo => todo.text);
}
function getFilteredTodos(todos){
	return todos.filter(todo => todo.completed);
}
function markAllTodos(todos){
	todos.forEach(todo => {todo.completed = true;})
}
function groupTodos(todos){
	return todos.groupBy(todo =>{
		return todo.completed;
	})
}

describe('Iterating over an Immuatble Js',() => {
	it('should convert all todos into a map of titles', () =>{
		let todos = Immutable.Map();
		for(let i =0 ; i< 10; i++){
			todos = addTodo(todos, new Todo('Todo'+ i, 'I am Todo', false));
		}
		const todosOfTitle = getMappedTodos(todos);
		console.log(todosOfTitle);
		expect(todosOfTitle.first()).to.equal('I am Todo');
	});
	it('Should return a subset of the map using filter method', () => {
		let todos = Immutable.Map();
		for(let i =0; i< 10; i++){
			todos = addTodo(todos, new Todo('Todo'+ i, 'I am Todo', i%2 === 0));
		}
		const filteredTodos = getFilteredTodos(todos);
		expect(filteredTodos.size).to.equal(5);
	});
	it('Modify all todos using forEach', () =>{
		let todos = Immutable.Map();
		for(let i =0; i< 10; i++){
			todos = addTodo(todos, new Todo('Todo'+i, 'I am Todo', i%2 === 0));
		}
		markAllTodos(todos);
		lodash.forEach(todos.toArray(), todo => {
			expect(todo.completed).to.equal(true);
		})
	});
	it('should group the todos, by using groupBy', () => {
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(10), (index) => {
			todos = addTodo(todos, new Todo('Todo'+index, 'I am Todo', index%2===0));
		});
		const GroupedTodos = groupTodos(todos);
		//console.log(GroupedTodos);
		expect(GroupedTodos.get(true).size).to.equal(5);
		expect(GroupedTodos.get(false).size).to.equal(5);
	})
})
