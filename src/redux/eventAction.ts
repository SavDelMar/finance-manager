import { Member } from "../components/NewEventCreation"

export type ObjSum = {
    totalSum: number,
    id: number
}
export type Expense = {
    expenseName: string,
    sum: number,
    membersPay: number[]
}
export type ExpenseObj = {
    expense: Expense,
    id: number
}
export type EventType = {
    eventName: string,
    members: Member[],
    totalSum: number
}
export const setEvent = (obj: EventType) => ({
    type: 'SET_EVENT',
    payload: obj,
})
    
export const setTotalEventSum = (obj: ObjSum) => ({
    type: 'SET_TOTAL_SUM',
    payload: obj,
})

export const setExpenseToEvent = (obj: ExpenseObj) => ({
    type: 'SET_EXPENSE',
    payload: obj,
})