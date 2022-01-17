import { EventType, ExpenseObj, ObjSum } from "./eventAction";

  
const initialEventState = {
    events: [],
};
  const initialSumsState = {
    sums: [],
  };
  const initialExpensesState = {
    expenses: [],
  };
  
type setEventActionType = {
      type: string,
      payload: EventType
}
type EventSumActionType = {
      type: string,
      payload: ObjSum
}
type setExpenseActionType = {
     type: string,
     payload: ExpenseObj
}
  
export const eventCreateReducer = (state = initialEventState, action: setEventActionType | EventSumActionType | setExpenseActionType) => {
    switch (action.type) {
        case 'SET_EVENT':
            let newState = JSON.parse(JSON.stringify(state));
            newState.events.push(action.payload);
            console.log(newState, 'from event create reducer')
        return newState;
      default:
        return state;
    }
};
  
export const totalEventSumReducer = (state = initialSumsState, action: EventSumActionType) => {
  switch (action.type) {
    case 'SET_TOTAL_SUM':
      let newState = JSON.parse(JSON.stringify(state));
      if (newState.sums[action.payload.id]) {
        newState.sums[action.payload.id] += action.payload.totalSum;
      } else {
        newState.sums.push(action.payload.totalSum);
      }
        console.log(newState, 'from total sum reducer')
       return newState;  
      default:
        return state;
    }
}
export const setExpenseReducer = (state = initialExpensesState, action: setExpenseActionType) => {
   switch (action.type) {
     case 'SET_EXPENSE':
       let newState = JSON.parse(JSON.stringify(state));
       if (!newState.expenses[action.payload.id])  {
           newState.expenses[action.payload.id] = [];
           newState.expenses[action.payload.id].push(action.payload.expense);
       } else {
          newState.expenses[action.payload.id].push(action.payload.expense);
       }
            console.log(newState, 'from expense reducer')
       return newState;  
      default:
        return state;
    }
}