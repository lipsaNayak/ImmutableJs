'use strict';
const Immutable = require('immutable');
const chai = require('chai');
const expect = chai.expect;
const lodash = require('lodash');

describe('Exploring Sequences()  and Range() in Immutable JS', () => {
	it('should see Seq() act like an iterable', () => {
		const range = lodash.range(1000);
		const immutableSeq = Immutable.Seq.of(...range);
		expect(immutableSeq.get(0)).to.equal(0);
		expect(immutableSeq.last()).to.equal(999);
	});
	it('Seq is lazy', () => {
		let numOfOpertaions =0;
		const range = lodash.range(1000);
		const immutableSeq = Immutable.Seq.of(...range)
			.map(num => {
				numOfOpertaions++;
				return num *2;
			});
		expect(numOfOpertaions).to.equal(0);
		immutableSeq.take(10).toArray();
		expect(numOfOpertaions).to.equal(10);
	});
	it('should not produce overflow with Immutable.Range', () =>{
		const immutableRange = Immutable.Range(1, Infinity);
		expect(immutableRange.size).to.equal(Infinity);

		const powerOfTwo = immutableRange.take(1000).map(number => number*2);
		expect(powerOfTwo.size).to.equal(1000);
	});
	it('should demonstrate chaining with Seq()', () => {
		const addPowersOfTwo = Immutable.Range(0, Infinity)
			.filter(num => num%2 !== 0)
			.map(num => num*2);
		const first1000OddPowers = addPowersOfTwo.take(1000);
		//console.log(first1000OddPowers);
		expect(first1000OddPowers.get(999)).to.equal(3998);
	});
});