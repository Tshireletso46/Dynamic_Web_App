import createStore from './store.js';
import { increment, subtract, reset } from './actions.js';
import reducer from './reducers.js';

const store = createStore(reducer);
const counterValue = document.getElementById('counter-value');
store.subscribe(() => {
  const { count } = store.getState();
  counterValue.value = count;
  console.log('New state:', store.getState());
});

// Scenario: Increment the counter by one
console.log('Scenario: Increment the counter by one');
console.log('Initial state:', store.getState());
store.dispatch(increment()); // Logs: New state: { count: 1 }
console.log('Current state:', store.getState());

// Scenario: Increment the counter by one
console.log('\nScenario: Increment the counter by one');
console.log('Initial state:', store.getState());
store.dispatch(increment()); // Logs: New state: { count: 2 }
store.dispatch(increment()); // Logs: New state: { count: 3 }
console.log('Current state:', store.getState());

// Scenario: Decrement the counter by one
console.log('\nScenario: Decrement the counter by one');
console.log('Initial state:', store.getState());
store.dispatch(subtract()); // Logs: New state: { count: 2 }
console.log('Current state:', store.getState());

// Scenario: Resetting the Tally Counter
console.log('\nScenario: Resetting the Tally Counter');
console.log('Initial state:', store.getState());
store.dispatch(reset()); // Logs: New state: { count: 0 }
console.log('Current state:', store.getState());









