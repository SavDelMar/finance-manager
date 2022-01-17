import { combineReducers } from 'redux';
import { eventCreateReducer, totalEventSumReducer, setExpenseReducer } from './eventCreateReducer';
const rootReducer = combineReducers({
  events: eventCreateReducer,
  totalSums: totalEventSumReducer,
  expenses: setExpenseReducer

});
export type AppState  = ReturnType<typeof rootReducer>

export default rootReducer;