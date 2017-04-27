'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;

describe('Equality Check with Immutable .is()', () =>{
	it('should return true when values are equal even though objects are not same', () =>{
		const map1 = Immutable.Map({a:1, b:2, c:Immutable.List.of(1)});
		const map2 = Immutable.Map({a:1, b:2, c:Immutable.List.of(1)});
		//expect(map1).to.equal(map2);
		expect(Immutable.is(map1, map2)).to.equal(true);
	});
	it('should return true if subset', () =>{
		const map1 = Immutable.Map({a:1, b:2});
		const map2 = Immutable.Map({a:1, b:2, c:Immutable.List.of(1)});
		expect(map1.isSubset(map2)).to.equal(true);
		expect(map2.isSubset(map1)).to.equal(false);
	});
	it('should return true if a superset', () =>{
		const map1 = Immutable.Map({a:1, b:2, c:Immutable.List.of(1)});
		const map2 = Immutable.Map({a:1, b:2});
		expect(map1.isSuperset(map2)).to.equal(true);
		expect(map2.isSuperset(map1)).to.equal(false);
	})
});