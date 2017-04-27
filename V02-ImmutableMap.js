"use strict";
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;

function createObjTodos(numTodos){
	var obj = {};
	for(let i = 0; i< numTodos; i++){
		const todoSequence = String(i+1);
		obj['todo'+todoSequence] = {
			title: 'Todo '+todoSequence,
			value: `Make ${todoSequence} happen`
		};
	};
	return obj;
}

describe('Object Graph with Immutable.js map', () => {
	it('should create a map with matching keys :', () => {
		const data = {
			'todo1' : {
				title: 'Todo 1',
				value: 'Make it happen'
			},
			'todo2' : {
				title: 'Todo 2',
				value: 'Make it happen'
			},
		};
		let immutableMap = Immutable.Map(data);
		expect(immutableMap.get('todo1').title).to.equal('Todo 1');
	});
	it('should create a map from array tuples', () => {
		let immutableMap = Immutable.Map([['todo1', {title: 'Todo 1'}],['todo2', {title: 'Todo 2'}]]);
		expect(immutableMap.get('todo2').title).to.equal('Todo 2');
	});
	it('should create Map() with same size as the keys in the object passed', () =>{
		let immutableMap = Immutable.Map(createObjTodos(10));
		expect(immutableMap.size).to.equal(10);

	});
});