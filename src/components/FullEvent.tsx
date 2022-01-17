import { Table } from '@mui/material';
import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { EventType, Expense, setTotalEventSum, setExpenseToEvent} from '../redux/eventAction';
import { AppState } from '../redux/rootReducer';
type fullEvent = {
    
}

const FullEvent: FC<fullEvent> = () => {
    
    const parameters = new URL(window.location.href);
    const id: number = parseInt(parameters.pathname.substring(8));
    const event: EventType = useSelector((state: AppState) => state.events.events[id]);
    const expenseItems: Expense[] = useSelector((state: AppState) => state.expenses[id]);
    const totalSum: number = useSelector((state: AppState) => state.totalSums[id]);

    const members = event.members.map(member => member.name);
    const name = event.eventName;
    const [expenseName, setExpenseName] = useState('');
    const InitialMemPay = members.concat(members).map(m => 0);
    const [membersPay, setMembersPay] = useState<number[]>(InitialMemPay);
    let doubled = members.concat(members);
    const dispatch = useDispatch();
  
    // let membersTotalPay = doubled.map((member, i) => expenseItems.reduce(function (acc, curr) {
    //     return acc + curr.membersPay[i];
    // }, 0));
    const setExpName = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setExpenseName(e.target.value);
    }
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value, e.target.id, membersPay);
        let id = parseInt(e.target.id);
        const nMP = [...membersPay];
        nMP[id] = parseInt(e.target.value);
        setMembersPay(nMP);
    }
    const updateTotalSumAndExpense = React.useCallback((objTotalSum, expenseObj) => {
        dispatch(setTotalEventSum(objTotalSum));
        dispatch(setExpenseToEvent(expenseObj));
    }, [dispatch]);

    const addExpense = () => {
        let sum = membersPay.reduce((acc, curr, i) => {
            if (i % 2 === 0) {
                return acc + curr
            } else {
                return acc
            }
        }, 0);
        let expense = {
            expenseName: expenseName,
            sum: sum,
            membersPay: membersPay
        };
        setExpenseName('');
        setMembersPay(InitialMemPay);
        updateTotalSumAndExpense({id: id, totalSum: totalSum ? totalSum+sum : sum}, {expense: expense, id: id});
    }

    return (
        <div>
            <Link to='/events'>
                To all events
            </Link>
            <h1>
                Event name: {name}
            </h1>
            <div className='event-table'>
                <Table>
                    <tbody>
                    <tr>
                        <th rowSpan={3}>Expense <br></br>items</th>
                        <th rowSpan={3}>Sum</th>
                        <th colSpan={members.length*2}>Members</th>
                    </tr>
                    <tr>
                        {members.map(member => <th colSpan={2}>{member}</th>)}
                    </tr>
                    <tr>
                        {doubled.map( (member, i) => i%2 ? <th>paid</th> : <th>owe</th>)}
                    </tr>
                    {expenseItems?.map(item => <tr>
                        <td>{item.expenseName}</td>
                        <td>{item.sum}</td>
                        {doubled?.map((it, i) => <td>{item.membersPay[i]}</td>  )}
                    </tr>)
                    }
                    <tr>
                        <th rowSpan={2}>Total</th>
                        <th rowSpan={2}>{totalSum}</th>
                        {doubled.map((it, i) => <td>
                            {expenseItems?.reduce(function (acc, curr) {
                                return acc + curr.membersPay[i];
                            }, 0)}
                        </td>)}
                        
                    </tr>
                    <tr>
                        {members.map((member, i) => <td colSpan={2}>
                            {/* {membersTotalPay[i*2+1] - membersTotalPay[i*2]} */}
                        </td>)}
                    </tr>
                    </tbody>   
                </Table>
                <button onClick={addExpense}>Add expense</button>
                <form>
                    <label>
                        <p>Expense name:</p>
                        <input value={expenseName} onChange={setExpName}></input>
                    </label> 
                    {members.map((member, index) => <div>
                        <p>Member: {member}</p>
                        <label>
                            Owe:
                            <input id={`${index * 2}`} value={membersPay[index * 2] ? membersPay[index * 2] : ''} onChange={handleChange}></input>
                        </label>
                        <label>
                            Paid:
                            <input id={`${index * 2 + 1}`} value={membersPay[index * 2 + 1] ? membersPay[index * 2 + 1] : ''} onChange={handleChange}></input>
                        </label>
                    </div>)}
                </form> 
              
            </div>
            
        </div>
        
    )
}

export default FullEvent
