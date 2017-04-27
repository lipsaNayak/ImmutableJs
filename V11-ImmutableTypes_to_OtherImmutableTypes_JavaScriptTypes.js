'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;

describe('Converting one Immutable type to another and to old java script types', () => {
	it('should be able to convert a immutable map to a immutable list', () => {
		const immutableMap = Immutable.Map({
			key1: 'First Item',
			key2: 'Second Item'
		});
		//Discrads all the keys
		const convertedImmutableList = immutableMap.toList();
		//console.log(convertedImmutableList);
		expect(Immutable.List.isList(convertedImmutableList)).to.equal(true);
		expect(convertedImmutableList.first()).to.equal('First Item');
		expect(convertedImmutableList.last()).to.equal('Second Item');
	});
	it('should be able to convert a immutable List to a Immutable Map', () => {
		const immutableList = Immutable.List.of('First Item', 'Second Item');
		const convertedImmutableMap = immutableList.toMap();
		expect(Immutable.Map.isMap(convertedImmutableMap)).to.be.true;
		const keys = convertedImmutableMap.keys();
		expect(keys.next().value).to.equal(0);
		expect(keys.next().value).to.equal(1);
		expect(convertedImmutableMap.get(0)).to.equal('First Item');
		expect(convertedImmutableMap.last()).to.equal('Second Item');
	});
	it('should be able to convert an immutable Map to an old Java Script Array', () => {
		const immutableNestedMap = Immutable.Map({
			key1: 'First Item',
			key2: 'Second Item',
			key3: {keyA: 'Nested Item'}
		});
		//Loses all the keys
		const javaScriptArray = immutableNestedMap.toArray();
		//console.log(javaScriptArray);
		expect(javaScriptArray[0]).to.equal('First Item');
		expect(javaScriptArray[2].keyA).to.equal('Nested Item');
	});
	it('should be able to convert am Immutable Map to a JSON', () => {
		const immutableNestedMap = Immutable.Map({
			key1: 'First Item',
			key2: 'Second Item',
			key3: {keyA: 'Nested Item'}
		});
		const json = immutableNestedMap.toJSON();
		expect(json.key1).to.equal('First Item');
		expect(json.key3.keyA).to.equal('Nested Item');

	});
});