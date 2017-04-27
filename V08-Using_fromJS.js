//'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;

describe('Using fromJS to convert Plain javascript objects into Immutable Data', () =>{
	it('should create an immutable map from plain java script object', () =>{
		const plainJSObject = {
			title: 'Go to the grocery',
			text: 'I need Milks and eggs',
			completed: false,
			category: {title: 'House duties', priority: 9}
		};
		const immutableMap = Immutable.fromJS(plainJSObject);
		expect(Immutable.Map.isMap(immutableMap)).to.be.true;
		expect(immutableMap.getIn(['category','title'])).to.equal('House duties');
	});
	it('should created deeply nested List from a plain java script array', () => {
		const plainJSArray = [
			'Go to the grocery store',
			'Buy milk and eggs',
			'Help Yodha with homework',
			['Buy Lemons', 'Make Lemonade']
		];
		const immutableList = Immutable.fromJS(plainJSArray);
		expect(Immutable.List.isList(immutableList)).to.be.true;
		expect(immutableList.getIn([3,1])).to.equal('Make Lemonade')
	});
	it('should use reveiver to generate Map() instead of List()', () =>{
		const plainJSArray = [
			'Go to the grocery store',
			'Buy milk and eggs',
			'Help Yodha with homework',
			['Buy Lemons', 'Make Lemonade']
		];
		const immutableMap = Immutable.fromJS(plainJSArray, (key,value) => value.toMap());
		expect(Immutable.Map.isMap(immutableMap)).to.be.true;
		expect(immutableMap.getIn([3, 1])).to.equal('Make Lemonade');
		const plainJSObject2 = {a: {b: [10, 20, 30]}, c: 40};
		const immutableMap2 = Immutable.fromJS(plainJSObject2, (key, value) => {
			var isIndexed = Immutable.Iterable.isIndexed(value);
			return isIndexed ? value.toList() : value.toOrderedMap();
		});
		console.log(immutableMap2);
	});
});