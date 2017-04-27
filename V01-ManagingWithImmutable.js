"use strict";
const Immutable = require('immutable');

const mutateValue = (iterable, pos, value) => {
    iterable[pos] = value;
}
const state = ['todo1','todo2'];
console.log('Org State: ',state);
const mutateState = state;
mutateValue(mutateState, 0, 'newTodo');
console.log('New State: ',state);

const immutableMutateState = (iterable, pos,value) => {
    return iterable.set(pos,value)
};
const immutableState = Immutable.List(['todo1', 'todo2']);
console.log('Org Immutable: ',immutableState);
const immutableState2 = immutableState;
const immutableState3 = immutableMutateState(immutableState2, 0, 'newTodo');
console.log('New Immutable: ',immutableState2);

let book = Immutable.fromJS({
    title: 'Harry Potter & The Goblet of Fire',
    isbn: '0439139600',
    series: 'Harry Potter',
    author: {
        firstName: 'J.K.',
        lastName: 'Rowling'
    }
});
console.log('Author name via get: ',book.get('author').get('lastName'));
console.log('Author name via getIn: ',book.getIn(['author','lastName']));