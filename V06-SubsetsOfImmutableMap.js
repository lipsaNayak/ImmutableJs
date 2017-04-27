'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;
const lodash = require('lodash');

class Todo  {
	constructor(title, text, completed){
		this.id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		this.title=title;
		this.text = text;
		this.completed = completed;
	}
}
function addTodo(todos, todo){
	return todos.set(todo.id, todo);
}
function reteriveAfterSlice(todos){
	return todos.slice(todos.size -2, todos.size)
}
function sliceLastTodo(todos){
	return todos.slice(0,-1);
}
function getButFirst(todos){
	return todos.slice(1,todos.size);
}
function getLast5Todo(todos){
	return todos.skip(5);
}
function skipUntilMonkey(todos){
	return todos.skipUntil(todo => todo.text === 'monkey');
}
function skipAfterMonkey(todos){
	return todos.skipWhile(todo => todo.text === 'monkey');
}
describe('Working with Subsets of Immutable Js', () =>{
	it('Reteriving last 2 entries using slice()', () =>{
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(10), index => {
			todos = addTodo(todos, new Todo('Todo'+index, 'I am a Todo', false));
		});
		const slicedTodos = reteriveAfterSlice(todos);
		// console.log(todos);
		// console.log(slicedTodos);
		todos.takeLast(2).forEach(todo => {
			expect(slicedTodos.get(todo.id)).to.equal(todo);
		});
	});
	it('Reteriving the last item using negative slice', () =>{
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(10), index =>{
			todos = addTodo(todos, new Todo('Todo' + index, 'I am todo', false));
		});
		const lastTodo = sliceLastTodo(todos);
		todos.butLast().forEach(todo => {
			expect(lastTodo.get(todo.id)).to.equal(todo);
		});
	});
	it('Reteriving all but first using slice', () => {
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(10), index => {
			todos = addTodo(todos, new Todo('Todo' + index, 'I am Todo', false));
		});
		const todosButFirst = getButFirst(todos);
		todos.rest().forEach(todo =>{
			expect(todosButFirst.get(todo.id)).to.equal(todo);
		});
	});
	it('Reteriving the rest of the map using skip', () =>{
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(10), index => {
			todos = addTodo(todos, new Todo('Todo' + index, 'I am Todo', false));
		});
		const last5Todos = getLast5Todo(todos);
		todos.takeLast(5).forEach(todo => {
			expect(last5Todos.get(todo.id)).to.equal(todo);
		});
	});
	it('Retun a Map after the desired value using SkipUntil', () =>{
		const Texts = ["dog", "cat", "frog", "monkey", "octopus", "horse", "orangutan"];
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(Texts.length), index => {
			todos = addTodo(todos,new Todo('Todo'+index, Texts[index],false));
		});
		const skipUntilMonkeysTodos = skipUntilMonkey(todos);
		todos.takeLast(4).forEach(todo =>{
			//console.log(skipUntilMonkeysTodos.get(todo.id).text);
			expect(skipUntilMonkeysTodos.get(todo.id)).to.equal(todo);
		});
	});
	it('Return a Map till the desired value using SkipWhile', () => {
		const Texts = ["dog", "cat", "frog", "monkey", "octopus", "horse", "orangutan"];
		let todos = Immutable.Map();
		lodash.forEach(lodash.range(Texts.length), index => {
			todos = addTodo(todos,new Todo('Todo'+index, Texts[index],false));
		});
		const skipAfterMonkeyTodos = skipAfterMonkey(todos);
		todos.take(4).forEach(todo =>{
			//console.log(skipAfterMonkeyTodos.get(todo.id).text);
			expect(skipAfterMonkeyTodos.get(todo.id)).to.equal(todo);
		});
	});
});